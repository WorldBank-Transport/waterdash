import React, { PropTypes } from 'react';
import * as func from '../../utils/functional';
import * as c from '../../utils/colours';
import T from '../misc/t';
import ViewModes from '../../constants/view-modes';
import { getNumberOr0 } from '../../utils/number';
import ShouldRenderMixin from '../../utils/should-render-mixin';
import HighCharts from 'highcharts';

require('stylesheets/charts/waterpoints-status-chart');

const STATUS = {
  'NON FUNCTIONAL': 'NON_FUNCTIONAL',
  'FUNCTIONAL NEEDS REPAIR': 'FUNCTIONAL_NEEDS_REPAIR',
  'FUNCTIONAL': 'FUNCTIONAL',
};
const STATUS_REVERSE = {
  'NON_FUNCTIONAL': 'NON FUNCTIONAL',
  'FUNCTIONAL_NEEDS_REPAIR': 'FUNCTIONAL NEEDS REPAIR',
  'FUNCTIONAL': 'FUNCTIONAL',
};
const DRILL_DOWN = {
  REGION: 'DISTRICT',
  DISTRICT: 'WARD',
  WARD: null,
};

const WaterpointStatusChart = React.createClass({
  propTypes: {
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),
    waterpoints: PropTypes.array.isRequired,
  },

  mixins: [ShouldRenderMixin],

  componentDidMount() {
    this.preventDrillDown = 0;
    this.getChart();
  },

  componentWillUnmount() {
    this.chart.destroy();
    delete this.chart;
  },

  getDrillDownId(status, level, levelName) {
    return `${status}-${level}-${levelName}`.replace(/\s/g, '_');
  },

  getRegionsOrderByFunctional(data) {
    const returnValue = [];
    const seen = {total: true};
    const unique = (item) => seen.hasOwnProperty(item) ? false : (seen[item] = true);
    Object.keys(data)
      .forEach(item => {
        Object.keys(data[item])
          .filter(unique)
          .forEach(key => returnValue.push({name: key, functional: data.FUNCTIONAL && data.FUNCTIONAL[key] ? data.FUNCTIONAL[key] : 0}));
      });
    const ordered = returnValue
      .sort( (a, b) => b.functional - a.functional)
      .map(item => item.name);
    return ordered;
  },

  sumNonFunctional(data, column) {
    return Object.keys(data)
        .filter(key => key.startsWith('NON FUNCTIONAL'))
        .reduce((ret, key) => {
          ret.value += getNumberOr0(data[key][column]);
          return ret;
        }, {value: 0}).value;
  },

  parseData(data, regions) {
    return Object.keys(STATUS).map(status => {
      return {
        color: c.Color.getWaterpointColor(status),
        name: status,
        data: regions.map(region => {
          let value = 0;
          if (status === 'NON FUNCTIONAL') { // we need to group all non functional
            value = this.sumNonFunctional(data, region);
          } else {
            value = data[status] ? getNumberOr0(data[status][region]) : 0;
          }
          return {
            name: region,
            y: value,
            drilldown: this.getDrillDownId(status, 'REGION', region),
          };
        }),
      };
    });
  },

  drilldown(e) {
    if (!e.seriesOptions && this.preventDrillDown === 0) {
      const drilldownName = e.point.drilldown;
      const [status, level, levelName] = drilldownName.split('-');
      const nextLevel = DRILL_DOWN[level];
      const realName = levelName.replace(/_/g, ' ');
      let data = this.props.waterpoints.filter(item => item[level] === realName); // get the portion of data for the drill down
      let statusList = Object.keys(STATUS);
      if (!e.points) { // drill down on the status
        data = data.filter(item => item.STATUS === STATUS_REVERSE[status]);
        statusList = statusList.filter(item => STATUS[item] === status);
      }
      const stats = func.Result.countByGroupBy(data, 'STATUS', nextLevel);
      const allSeries = {};
      statusList.forEach(s => {
        allSeries[STATUS[s]] = {
          name: `${s} ${realName}`,
          data: Object.keys(stats[s] ? stats[s] : [])
            .filter(key => key !== 'total')
            .map(key => {
              let value = 0;
              if (status === 'NON FUNCTIONAL') { // we need to group all non functional
                value = this.sumNonFunctional(stats, key);
              } else {
                value = getNumberOr0(stats[s][key]);
              }
              const drillDownObject = {
                name: key,
                y: value,
              };
              if (DRILL_DOWN[level] && DRILL_DOWN[level] !== null) {
                drillDownObject.drilldown = this.getDrillDownId(status, DRILL_DOWN[level], key);
              }
              return drillDownObject;
            }).sort((a, b) => b.y - a.y),
        };
      });
      if (!e.points) { // drill down on a single state
        this.chart.addSeriesAsDrilldown(e.point, allSeries[status]);
      } else { // drill down on all (multiple series)
        e.points.forEach((item) => {
          const statusName = item.drilldown.split('-')[0];
          this.chart.addSingleSeriesAsDrilldown(item, allSeries[statusName]);
        });
        this.preventDrillDown += 2; // two levels of drill down
        this.chart.applyDrilldown();
      }
    } else {
      this.preventDrillDown--;
    }
  },

  drillup() {

  },

  getChart() {
    if (this.props.waterpoints.length === 0) {
      return false;
    }
    const data = func.Result.countByGroupBy(this.props.waterpoints, 'STATUS', 'REGION');
    const regions = this.getRegionsOrderByFunctional(data);
    const stats = this.parseData(data, regions);
    //const drilldown = this.getDrilldown(data, regions);
    this.chart = new HighCharts.Chart({
      chart: {
        height: 360,
        type: 'column',
        renderTo: 'waterpoints-status-chart',
        events: {
          drilldown: this.drilldown,
          drillup: this.drillup,
        },
      },

      title: {
        text: '',
      },

      xAxis: {
        type: 'category',
      },

      tooltip: {
        headerFormat: '<div><h3 class="chart-title row">{point.key}</h3><ul class="items">',
        pointFormat: '<li>' +
            '<spam class="metric-title">{series.name}:</spam>' +
            '<div class="waterpoint-tooltip-stat-wrapper">' +
              '<span class="number">{point.y}</span> of <span class="number">{point.total}</span>' +
            '</div>' +
          '</li>',
        footerFormat: '</ul></div>',
        shared: true,
        useHTML: true,
        borderWidth: 0,
      },

      plotOptions: {
        column: {
          stacking: 'normal',
          dataLabels: {
            color: (HighCharts.theme && HighCharts.theme.dataLabelsColor) || 'white',
            style: {
              textShadow: '0 0 3px black',
            },
          },
        },
      },

      series: stats,
      drilldown: {
        activeAxisLabelStyle: {
          cursor: 'pointer',
          textDecoration: 'none',
        },
      },
    });
    return this.chart;
  },

  render() {
    if (this.props.waterpoints.length === 0) {
      return false;
    }
    return (
      <div className="stack-bar-chart">
        <h3 className="main-chart-title"><T k="chart.title-waterpoints-status" /></h3>
        <p className="chart-helptext"><T k="chart.title-waterpoints-status-helptext" /><T k="chart.doubleClick.help" /></p>
        <div className="chart-container" id="waterpoints-status-chart"></div>
      </div>
    );
  },
});

export default WaterpointStatusChart;
