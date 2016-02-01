import React, { PropTypes } from 'react';
import { Result } from '../../utils/functional';
import T from '../misc/t';
import ShouldRenderMixin from '../../utils/should-render-mixin';
import HighCharts from 'highcharts';

require('stylesheets/charts/boreholes-stats-chart');

const BoreholesStatsChart = React.createClass({
  propTypes: {
    boreholes: PropTypes.array.isRequired,
    years: PropTypes.object.isRequired,
  },

  mixins: [
    ShouldRenderMixin,
  ],

  componentDidMount() {
    this.getChart();
  },

  componentDidUpdate() {
    this.getChart();
  },

  componentWillUnmount() {
    this.chart.destroy();
    delete this.chart;
  },

  parseData(metrics, data) {
    return metrics.map(key => {
      return {
        name: key,
        data: Object.keys(data)
          .filter(year => data[year])
          .map(year => {
            return {
              name: year,
              y: data[year].reduce((res, metric) => {
                if (metric[key]) {
                  res.value = metric[key];
                }
                return res;
              }, {value: 0}).value,
            };
          }),
      };
    });
  },

  getChart() {
    if (this.props.boreholes.length === 0 || (Object.keys(this.props.years).filter(year => this.props.years[year]).length < 2)) {
      return false;
    }
    const metrics = ['DIAMETER', 'DEPTH_METER', 'STATIC_WATER_LEVEL', 'DYNAMIC_WATER_LEVEL_METER', 'DRAW _DOWN_METER', 'YIELD_METER_CUBED_PER_HOUR'];
    const dataRes = Result.sumByGroupBy(this.props.boreholes, 'YEAR_FROM', metrics);
    this.chart = new HighCharts.Chart({
      chart: {
        height: 400,
        type: 'spline',
        renderTo: 'boreholes-time',
      },

      colors: ['#2189b3', '#2597c5', '#31aee1', '#4fbfea', '#71cff4', '#8cdfff', '#abe7ff', '#c9efff', '#def5fe', '#ecf9ff'],

      title: {
        text: '',
      },

      xAxis: {
        type: 'category',
      },

      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true,
      },

      plotOptions: {
        spline: {
          marker: {
            radius: 4,
            lineColor: '#666666',
            lineWidth: 1,
          },
        },
      },

      series: this.parseData(metrics, dataRes),
    });
    return this.chart;
  },

  render() {
    if (this.props.boreholes.length === 0 || (Object.keys(this.props.years).filter(year => this.props.years[year]).length < 2)) {
      return false;
    }
    return (
      <div className="boreholes-stats-chart">
        <h3><T k="chart.title-boreholes-stats" /></h3>
        <p className="chart-helptext"><T k="chart.title-boreholes-stats-helptext" /></p>
        <div className="chart-container" id="boreholes-time"></div>
      </div>
    );
  },
});

export default BoreholesStatsChart;
