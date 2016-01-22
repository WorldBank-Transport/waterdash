import React, { PropTypes } from 'react';
import ShouldRenderMixin from '../../utils/should-render-mixin';
import HighCharts from 'highcharts';
import { getNumberOr0 } from '../../utils/number';
import * as m from '../../utils/metrics';

const BoreholesMetricsChart = React.createClass({

  propTypes: {
    chartId: PropTypes.string.isRequired,
    metrics: PropTypes.array.isRequired,
    stats: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
  },

  mixins: [ShouldRenderMixin],

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

  getValue(data, region, metric) {
    return data[region].find(item => item.hasOwnProperty(metric));
  },

  parseData(data, metrics) {
    return metrics.map(metric => {
      const f = m.boreholesMetricCal[metric];
      return {
        name: metric,
        data: Object.keys(data)
                .filter(k => k !== 'total')
                .map(region => {
                  const found = this.getValue(data, region, metric);
                  return {
                    name: region,
                    y: f(getNumberOr0(found[metric]), found.total),
                  };
                }),
      };
    });
  },

  getChart() {
    this.chart = new HighCharts.Chart({
      chart: {
        height: 400,
        type: 'column',
        renderTo: this.props.chartId,
      },

      colors: ['#2189b3', '#2597c5', '#31aee1', '#4fbfea', '#71cff4', '#8cdfff', '#abe7ff', '#c9efff', '#def5fe', '#ecf9ff'],

      title: {
        text: this.props.title,
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

      series: this.parseData(this.props.stats, this.props.metrics),
    });
    return this.chart;
  },

  render() {
    return (
      <div>
        <div id={this.props.chartId}></div>
      </div>
    );
  },
});

export default BoreholesMetricsChart;
