import isUndefined from 'lodash/lang/isUndefined';
import React, { PropTypes } from 'react';
import { connect } from 'reflux';
import HighCharts from 'highcharts';
import PopulationStore from '../../stores/population';
import * as func from '../../utils/functional';
import {load} from '../../actions/population';
import T from '../misc/t';
import ShouldRenderMixin from '../../utils/should-render-mixin';
import ViewModes from '../../constants/view-modes';

require('highcharts/modules/drilldown')(HighCharts);
require('stylesheets/charts/waterpoint-population-serve-chart');

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

  getChart() {
    // needs translations
    const data = this.parseData(this.waterpointsRes, this.popAgg);
    const chart = new HighCharts.Chart({
      chart: {
        type: 'column',
        renderTo: 'container-2',
      },
      title: {
        text: 'National',
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
        data: data.values,
      }],

      drilldown: {
        series: data.level1,
      },
    });
    return chart;
  },

// this is quite messep up refactoring is needed alos perfoance is quite bad takes some time due iterations
  parseData(waterpoints, population) {
    const response = {
      label: 'People Waterpoint Ratio',
      values: [],
      level1: [],
    };
    const wps = this.props.waterpoints;
    const comparator = (a, b) => b.y - a.y;
    response.values = Object.keys(waterpoints)
                        .filter(key => key !== 'total')
                        .map(key => {
                          const regPopulation = isUndefined(population[key]) ? 0 : population[key][0].TOTAL; // if we don't have the population we show the real number
                          const districWaterPoints = func.Result.countBy(wps.filter(item => item.REGION === key), 'DISTRICT');
                          const ditrictPop = func.Result.sumByGroupBy(this.state.population, 'DISTRICT', ['TOTAL']);
                          const wardPop = func.Result.sumByGroupBy(this.state.population, 'WARD', ['TOTAL']);
                          const districDrillDownLevel1 = {};
                          districDrillDownLevel1.id = key;
                          districDrillDownLevel1.name = key;
                          districDrillDownLevel1.data = [];
                          Object.keys(districWaterPoints)
                              .filter(dstrickey => dstrickey !== 'total')
                              .map(dstrickey => {
                                const pop = isUndefined(ditrictPop[dstrickey]) ? 0 : ditrictPop[dstrickey][0].TOTAL;
                                districDrillDownLevel1.data.push({name: dstrickey, y: parseFloat((pop / districWaterPoints[dstrickey]).toFixed(2)), drilldown: dstrickey});

                                const districDrillDownLevel2 = {};
                                districDrillDownLevel2.id = dstrickey;
                                districDrillDownLevel2.name = dstrickey;
                                districDrillDownLevel2.data = [];
                                const wardWaterPoints = func.Result.countBy(wps.filter(item => item.DISTRICT === dstrickey), 'WARD');
                                Object.keys(wardWaterPoints) //eslint-disable-line no-sequences
                                    .filter(wardkey => wardkey !== 'total')
                                    .map(wardkey => {
                                      const popward = isUndefined(wardPop[wardkey]) ? 0 : wardPop[wardkey][0].TOTAL;
                                      districDrillDownLevel2.data.push([wardkey, parseFloat((popward / wardWaterPoints[wardkey]).toFixed(2))]);
                                    }),
                                districDrillDownLevel2.data.sort(function(a, b) {
                                  return parseFloat(b[1]) - parseFloat(a[1]);
                                });
                                response.level1.push(districDrillDownLevel2);
                              });
                          districDrillDownLevel1.data.sort(comparator);
                          response.level1.push(districDrillDownLevel1);
                          return {
                            name: key,
                            y: parseFloat((regPopulation / waterpoints[key]).toFixed(2)),
                            drilldown: key,
                          };
                        }).sort(comparator);
    return response;
  },
  render() {
    if (isUndefined(this.props.waterpoints.length === 0)) {
      return (<div>empty</div>);
    }
    this.drillDown = ViewModes.getDrillDown(this.props.viewMode);
    this.waterpointsRes = func.Result.countBy(this.props.waterpoints, this.drillDown);
    this.popAgg = func.Result.sumByGroupBy(this.state.population, this.drillDown, ['TOTAL']);
    return (
      <div className="waterpoint-population-serve-chart">
        <h3><T k="chart.title-population-served" /> - <span className="chart-helptext"><T k="chart.title-title-population-served-helptext" /></span></h3>
        <div><p><T k="chart.click.help" /></p></div>
        <div className="chart-container " id="container-2">
        </div>
      </div>);
  },
});

export default WaterpointPopulationServeChart;
