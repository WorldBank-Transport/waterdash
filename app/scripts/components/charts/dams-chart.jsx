import React, { PropTypes } from 'react';
import { Result } from '../../utils/functional';
import TSetChildProps from '../misc/t-set-child-props';
import T from '../misc/t';
import ShouldRenderMixin from '../../utils/should-render-mixin';
import { metricCal } from '../../utils/metrics';
import HighCharts from 'highcharts';

require('stylesheets/charts/dams-chart');

const DamsChart = React.createClass({
  propTypes: {
    data: PropTypes.array,  // injected
  },

  mixins: [ShouldRenderMixin],

  componentDidMount() {
    this.getChart();
  },

  componentDidUpdate() {
    this.getChart();
  },

  parseData(data, metrics) {
    return metrics.map(metric => {
      return {
        name: metric,
        data: Object.keys(data).map(poly => {
          const f = metricCal[metric];
          const m = data[poly].filter(item => item.hasOwnProperty(metric));
          const y = f(m[0][metric], m[0].total);
          return {
            name: poly,
            y: y,
          };
        }),
      };
    });
  },

  getChart() {
    if (this.props.data.length === 0 || !this.props.data[0].hasOwnProperty('DAM_NAME')) {
      return false;
    }
    const metrics = Object.keys(metricCal);
    const dataRes = Result.sumByGroupBy(this.props.data, 'REGION', metrics);
    const stats = this.parseData(dataRes, metrics);
    return new HighCharts.Chart({
      chart: {
        height: 400,
        type: 'column',
        renderTo: 'dams-chart',
      },

      title: {
        text: '',
      },

      xAxis: {
        type: 'category',
      },

      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true,
      },

      series: stats,
    });
  },

  render() {
    if (this.props.data.length === 0 || !this.props.data[0].hasOwnProperty('DAM_NAME')) {
      return false;
    }
    return (
      <div className="container">
        <div className="secondaryCharts">
          <div className="row">
            <div className="mainChart">
              <div className="dams-chart">
                <h3 className="main-chart-title"><T k="chart.title-dams" /> - <span className="chart-helptext"><T k="chart.title-dams-status-helptext" /></span></h3>
                <TSetChildProps>
                  <div className="chart-container" id="dams-chart"></div>
                </TSetChildProps>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
});

export default DamsChart;
