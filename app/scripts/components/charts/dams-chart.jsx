import React, { PropTypes } from 'react';
import { Result } from '../../utils/functional';
import ShouldRenderMixin from '../../utils/should-render-mixin';
import { metricCal } from '../../utils/metrics';
import HighCharts from 'highcharts';

require('stylesheets/charts/dams-chart');

const DRILL_DOWN = {
  REGION: 'DISTRICT',
  DISTRICT: null,
  WARD: null,
};

const DamsChart = React.createClass({
  propTypes: {
    data: PropTypes.array,  // injected
    subtitle: PropTypes.string,
    titleDamHeight: PropTypes.string,
    titleElevation: PropTypes.string,
    titleReservoir: PropTypes.string,
  },

  mixins: [ShouldRenderMixin],

  componentDidMount() {
    this.preventDrillDown = 0;
    this.getChart();
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

  getDrillDownId(metric, level, levelName) {
    return `${metric}-${level}-${levelName}`.replace(/\s/g, '_');
  },

  parseData(data, metrics) {
    return metrics.map((metric, index) => {
      return {
        name: metric,
        level: 'National',
        data: Object.keys(data).map(poly => {
          const f = metricCal[metric];
          const m = data[poly].filter(item => item.hasOwnProperty(metric));
          const y = f(m[0][metric], m[0].total);
          return {
            name: poly,
            y: y,
            drilldown: this.getDrillDownId(metric, 'REGION', poly),
          };
        }),
        visible: index === 0,
      };
    });
  },

  drilldown(e) {
    if (!e.seriesOptions) {
      const drilldownName = e.point.drilldown;
      const [currentMetric, level, levelName] = drilldownName.split('-');
      if (DRILL_DOWN[level] === null) {
        return;
      }
      const nextLevel = DRILL_DOWN[level];
      const realName = levelName.replace(/_/g, ' ');
      const data = this.props.data.filter(item => item[level] === realName); // get the portion of data for the drill down
      const metrics = Object.keys(metricCal);
      const stats = Result.sumByGroupBy(data, nextLevel, metrics);
      const allSeries = {};
      metrics.forEach((metric) => {
        allSeries[metric] = {
          name: metric,
          level: realName,
          data: Object.keys(stats).map(poly => {
            const f = metricCal[metric];
            const m = stats[poly].find(item => item.hasOwnProperty(metric));
            const y = f(m[metric], m.total);
            return {
              name: poly,
              y: y,
            };
          }),
          visible: metric === currentMetric,
        };
      });
      if (e.points) { // drill down on all (multiple series)
        e.points.forEach((item) => {
          if (item.drilldown) {
            const statusName = item.drilldown.split('-')[0];
            this.chart.addSingleSeriesAsDrilldown(item, allSeries[statusName]);
          }
        });
        this.chart.applyDrilldown();
      }
    }
  },

  getChart() {
    if (this.props.data.length === 0 || !this.props.data[0].hasOwnProperty('DAM_NAME')) {
      return false;
    }
    const metrics = Object.keys(metricCal);
    const dataRes = Result.sumByGroupBy(this.props.data, 'REGION', metrics);
    const stats = this.parseData(dataRes, metrics);
    const titles = [this.props.titleReservoir, this.props.titleDamHeight, this.props.titleElevation];
    HighCharts.setOptions({
      lang: {
        drillUpText: '<< Back to {series.level}',
      },
    });
    this.chart = new HighCharts.Chart({
      chart: {
        height: 360,
        type: 'column',
        renderTo: 'dams-chart',
        events: {
          drilldown: this.drilldown,
        },
      },

      colors: ['#2189b3', '#2597c5', '#31aee1'],

      title: {
        text: this.props.titleReservoir,
      },

      subtitle: {
        text: this.props.subtitle,
      },

      xAxis: {
        type: 'category',
      },

      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.0f}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true,
      },
      plotOptions: {
        series: {
          events: {
            legendItemClick: function() {
              const seriesIndex = this.index;
              const series = this.chart.series;
              for (let i = 0; i < series.length; i++) {
                if (series[i].index !== seriesIndex) {
                  series[i].hide();
                } else {
                  series[i].show();
                  this.chart.setTitle({ text: titles[i]});
                }
              }
              return false;
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
    if (this.props.data.length === 0 || !this.props.data[0].hasOwnProperty('DAM_NAME')) {
      return false;
    }
    return (
      <div className="container">
        <div className="secondaryCharts">
          <div className="row">
            <div className="mainChart">
              <div className="dams-chart">
                {/*
                <h3 className="main-chart-title"><T k="chart.title-dams" /></h3>
                <p className="chart-helptext"><T k="chart.title-dams-status-helptext" /></p>
               */}
                <div className="chart-container" id="dams-chart"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
});

export default DamsChart;
