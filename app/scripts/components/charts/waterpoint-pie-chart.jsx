import React, { PropTypes } from 'react';
import { Result } from '../../utils/functional';
import ShouldRenderMixin from '../../utils/should-render-mixin';
import T from '../misc/t';
import HighCharts from 'highcharts';
import ChartDataLink from '../boilerplate/chart-data-link';

require('stylesheets/charts/waterpoint-pie-chart');

const WaterpointPieChart = React.createClass({
  propTypes: {
    column: PropTypes.string,
    data: PropTypes.array,  // injected
    id: PropTypes.string,
  },

  mixins: [ShouldRenderMixin],

  componentDidMount() {
    this.getChart(this.props.data);
  },

  componentWillUpdate(nextProps) {
    this.getChart(nextProps.data);
  },

  componentWillUnmount() {
    if (this.chart) {
      this.chart.destroy();
      delete this.chart;
    }
  },

  parseData(data) {
    const seriedata = { name: 'Water',  colorByPoint: true, id: 'Water'};
    const values = Object.keys(data)
                    .filter(key => key !== 'total')
                    .map(key => {
                      return {
                        name: key,
                        y: data[key],
                      };
                    }).sort((a, b) => b.y - a);
    seriedata.data = values;
    return seriedata;
  },

  getChart(data) {
    // needs translations
    const stats = Result.countBy(data, this.props.column);
    this.chart = new HighCharts.Chart({
      chart: {
        renderTo: this.props.id,
        type: 'pie',
        width: 350,
      },
      colors: ['#2189b3', '#2597c5', '#31aee1', '#4fbfea', '#71cff4', '#8cdfff', '#abe7ff', '#c9efff', '#def5fe', '#ecf9ff'],
      title: {
        text: this.props.column,
      },
      tooltip: {
        pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>',
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          },
          depth: 45,
          innerSize: 100,
          showInLegend: true,
        },
      },
      series: [this.parseData(stats)],
    });
    return this.chart;
  },

  render() {
    return (
      <div className="waterpoint-pie-chart">
      <h3><T k={`chart.pie.${this.props.column}`} /></h3>
      <p className="chart-helptext"><ChartDataLink dataId="c267883f-ffcf-4f9c-a7f1-887451236134" /></p>
        <div className="chart-container" id={this.props.id}></div>
      </div>
    );
  },
});

export default WaterpointPieChart;
