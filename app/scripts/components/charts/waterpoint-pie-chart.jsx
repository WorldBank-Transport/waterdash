import React, { PropTypes } from 'react';
import * as func from '../../utils/functional';
import * as c from '../../utils/colours';
import ShouldRenderMixin from '../../utils/should-render-mixin';
import T from '../misc/t';
import HighCharts from 'highcharts';

require('stylesheets/charts/waterpoint-pie-chart');

const WaterpointPieChart = React.createClass({
  propTypes: {
    column: PropTypes.string,
    data: PropTypes.array,  // injected
    id: PropTypes.string,
  },

  mixins: [ShouldRenderMixin],

  getInitialState() {
    const allValues = Object.keys(c.Color[this.props.column]).reduce((agg, k) => {
      agg[k] = true;
      return agg;
    }, {});
    return {
      values: allValues,
    };
  },

  componentDidMount() {
    this.getChart();
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
                    });
    seriedata.data = values;
    return seriedata;
  },

  getChart() {
   // needs translations
    const data = func.Result.countBy(this.props.data, this.props.column);
    const chart = new HighCharts.Chart({
      chart: {
        renderTo: this.props.id,
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
      },
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
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          },
        },
      },
      series: [this.parseData(data)],
    });
    return chart;
  },

  render() {
    return (
      <div className="waterpoint-pie-chart">
      <h3><T k={`chart.pie.${this.props.column}`} /></h3>
        <div className="chart-container" id={this.props.id}></div>
      </div>
    );
  },
});

export default WaterpointPieChart;
