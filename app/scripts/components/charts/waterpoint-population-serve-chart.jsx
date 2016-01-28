import isUndefined from 'lodash/lang/isUndefined';
import React, { PropTypes } from 'react';
import { connect } from 'reflux';
import HighCharts from 'highcharts';
import PopulationStore from '../../stores/population';
import { Result } from '../../utils/functional';
import {load} from '../../actions/population';
import T from '../misc/t';
import ShouldRenderMixin from '../../utils/should-render-mixin';
import ViewModes from '../../constants/view-modes';

require('stylesheets/charts/waterpoint-population-serve-chart');

const DRILL_DOWN = {
  REGION: 'DISTRICT',
  DISTRICT: 'WARD',
  WARD: null,
};

const comparator = (a, b) => b.y - a.y;

const WaterpointPopulationServeChart = React.createClass({

  propTypes: {
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),
    waterpoints: PropTypes.array.isRequired,
  },

  mixins: [
    connect(PopulationStore, 'population'),
    ShouldRenderMixin,
  ],

  getInitialState() {
    load();
  },

  componentDidUpdate() {
    this.getChart();
  },

  componentWillUnmount() {
    this.chart.destroy();
    delete this.chart;
  },

  getChart() {
    if (this.props.waterpoints.length === 0) {
      return false;
    }
    const data = this.parseData();
    this.chart = new HighCharts.Chart({
      chart: {
        type: 'column',
        renderTo: 'container-2',
        events: {
          drilldown: this.drilldown,
          //drillup: this.drillup,
        },
      },
      colors: ['#104459', '#13526b', '#175f7d', '#1b6e8e', '#1e7ba0', '#2189b3', '#2597c5', '#29a4d7', '#31aee1', '#40b5e3', '#50bce6', '#62c3e8', '#73c9ea', '#84cfed', '#95d6f0', '#a7ddf2', '#b8e4f5', '#caebf7', '#c7e0e9', '#c5d6dc', '#c9d3d7', '#d3dde1', '#dcdcdc', '#e8e8e8', '#edf8fd'],
      title: {
        text: '',
      },
      xAxis: {
        type: 'category',
      },

      legend: {
        enabled: true,
      },

      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            format: '{point.y:.0f}',
          },
        },
      },

      tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.0f}</b><br/>',
      },

      series: [{
        name: 'National',
        colorByPoint: true,
        data: data,
      }],

      // drilldown: {
      //   series: data.level1,
      // },
    });
    return this.chart;
  },

  getDrillDownId(level, levelName) {
    return `${level}-${levelName}`.replace(/\s/g, '_');
  },

// this is quite messep up refactoring is needed alos perfoance is quite bad takes some time due iterations
  parseData() {
    const drillDown = ViewModes.getDrillDown(this.props.viewMode);
    const waterpoints = Result.countBy(this.props.waterpoints, drillDown);
    const population = Result.sumByGroupBy(this.state.population, drillDown, ['TOTAL']);
    return Object.keys(waterpoints)
                        .filter(key => key !== 'total')
                        .map(key => {
                          const regPopulation = isUndefined(population[key]) ? 0 : population[key][0].TOTAL; // if we don't have the population we show the real number
                          return {
                            name: key,
                            y: parseFloat((regPopulation / waterpoints[key])),
                            drilldown: this.getDrillDownId(drillDown, key),
                          };
                        }).sort(comparator);
  },

  drilldown(e) {
    if (!e.seriesOptions) {
      this.chart.showLoading('Loading ...');
      const drilldownName = e.point.drilldown;
      const [level, levelName] = drilldownName.split('-');
      const nextLevel = DRILL_DOWN[level];
      const realName = levelName.replace(/_/g, ' ');
      let data = this.props.waterpoints.filter(item => item[level] === realName); // get the portion of data for the drill down
      const waterStats = Result.countBy(data, nextLevel);
      const population = this.state.population.filter(item => item[level] === realName);
      const populationStats = Result.sumByGroupBy(population, nextLevel, ['TOTAL']);
      const series = {
        name: realName,
        data: [],
      };
      Object.keys(waterStats)
          .filter(key => key !== 'total')
          .forEach(key => {
            const pop = isUndefined(populationStats[key]) ? 0 : populationStats[key][0].TOTAL; // if we don't have the population we show the real number
            const item = {
              name: key,
              y: parseFloat((pop / waterStats[key])),
            };
            if (DRILL_DOWN[level] && DRILL_DOWN[level] !== null) {
              item.drilldown = this.getDrillDownId(DRILL_DOWN[level], key);
            }
            series.data.push(item);
          });
      series.data.sort(comparator);
      this.chart.hideLoading();
      this.chart.addSeriesAsDrilldown(e.point, series);
    }
  },

  render() {
    if (this.props.waterpoints.length === 0) {
      return false;
    }
    return (
      <div className="waterpoint-population-serve-chart">
        <h3><T k="chart.title-population-served" /> - <span className="chart-helptext"><T k="chart.title-title-population-served-helptext" /></span></h3>
        <p><T k="chart.doubleClick.help" /></p>
        <div className="chart-container " id="container-2">
        </div>
      </div>);
  },
});

export default WaterpointPopulationServeChart;
