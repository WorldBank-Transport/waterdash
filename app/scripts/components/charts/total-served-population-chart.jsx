import React, { PropTypes } from 'react';
import { connect } from 'reflux';
import ServedPulationStore from '../../stores/servedpopulation';
import { load } from '../../actions/servedpopulation';
import T from '../misc/t';
import Resize from '../../utils/resize-mixin';
import ShouldRenderMixin from '../../utils/should-render-mixin';
import ViewModes from '../../constants/view-modes';
import HighCharts from 'highcharts';
import colours from '../../utils/colours';
import ChartDataLink from '../boilerplate/chart-data-link';

require('stylesheets/charts/total-served-population-chart');

const TotalServedPulationChart = React.createClass({
  propTypes: {
    data: PropTypes.array.isRequired,
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),
  },
  mixins: [
    connect(ServedPulationStore, 'servedpopulation'),
    Resize,
    ShouldRenderMixin,
  ],

  getInitialState() {
    load();
    return {};
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

  parseData(data, type) {
    const response = {
      label: 'Total Population Served',
      values: [],
    };
    const comparator = (a, b) => {
      if (a > b) {
        return 1;
      } else if (b > a) {
        return -1;
      } else {
        return 0;
      }};
    response.values = Object.keys(data).map(key => {
      const served = data;
      const item = served[key];
      if (type === 'years') {
        return item.YEAR.toString();
      }
      return item.PERCENTAGE;
    }).sort(comparator);
    return response;
  },

  getChart() {
    if (this.state.servedpopulation.length === 0) {
      return false;
    }
    this.chart = new HighCharts.Chart({
      chart: {
        height: 400,
        type: 'spline',
        renderTo: 'container-1',
      },
      colors: [colours.theme],

      title: {
        text: '',
      },

      xAxis: {
        categories: this.parseData(this.state.servedpopulation, 'years').values,
      },

      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
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

      series: [{
        name: 'Population Served in %',
        data: this.parseData(this.state.servedpopulation, null).values,
      }],
    });
    return this.chart;
  },

  render() {
    if (this.state.servedpopulation.length === 0) {
      return false;
    }
    return (
      <div className="total-servedpopulation-chart">
        <h3><T k="chart.waterpoint-total-servedpopulation" /></h3>
        <p className="chart-helptext"><ChartDataLink dataId="water" /></p>
        <div className="chart-container" id="container-1"></div>
      </div>);
  },
});

export default TotalServedPulationChart;
