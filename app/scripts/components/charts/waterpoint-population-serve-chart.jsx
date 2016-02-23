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
import { filter, unfilter } from '../../actions/filters';
import ChartDataLink from '../boilerplate/chart-data-link';

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
    if (this.chart) {
      this.chart.destroy();
      delete this.chart;
    }
  },

  getChart() {
    if (this.props.waterpoints.length === 0) {
      return false;
    }
    HighCharts.setOptions({
      lang: {
        drillUpText: '<< Back to {series.level}',
      },
    });
    const data = this.parseData();
    this.chart = new HighCharts.Chart({
      chart: {
        type: 'column',
        renderTo: 'container-2',
        events: {
          drilldown: this.drilldown,
          drillup: this.drillup,
        },
      },
      colors: ['#1da3da'],
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

      drilldown: {
        activeAxisLabelStyle: {
          cursor: 'pointer',
          textDecoration: 'none',
        },
      },
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
                            level: 'National',
                            name: key,
                            y: parseFloat((regPopulation / waterpoints[key])),
                            drilldown: this.getDrillDownId(drillDown, key),
                          };
                        }).sort(comparator);
  },

  drillup() {
    unfilter();
  },


  drilldown(e) {
    if (!e.seriesOptions) {
      const drilldownName = e.point.drilldown;
      const [level, levelName] = drilldownName.split('-');
      if (DRILL_DOWN[level] === null) {
        return;
      }
      this.chart.showLoading('Loading ...');
      const nextLevel = DRILL_DOWN[level];
      const realName = levelName.replace(/_/g, ' ');
      filter(level, realName);
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
              level: realName,
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
        <h3><T k="chart.title-population-served" /></h3>
        <p className="chart-helptext">
          <ChartDataLink dataId="a94b3653-55f4-4455-9bed-42b92d5c4370" />
          <T k="chart.title-title-population-served-helptext" />
        </p>
        <div className="chart-container " id="container-2">
        </div>
      </div>);
  },
});

export default WaterpointPopulationServeChart;
