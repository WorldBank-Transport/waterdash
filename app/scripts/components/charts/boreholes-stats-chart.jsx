import React, { PropTypes } from 'react';
import {LineChart} from 'react-d3-components';
import * as func from '../../utils/functional';
import TSetChildProps from '../misc/t-set-child-props';
import T from '../misc/t';
import Resize from '../../utils/resize-mixin';
import WaterpointstatusOptions from './waterpoint-status-options';
import * as c from '../../utils/colours';
import ShouldRenderMixin from '../../utils/should-render-mixin';

require('stylesheets/charts/boreholes-stats-chart');

const BoreholesStatsChart = React.createClass({
  propTypes: {
    boreholes: PropTypes.array.isRequired,
  },

  mixins: [
    Resize,
    ShouldRenderMixin,
  ],

  getInitialState() {
    return {
      metrics: {
        DIAMETER: true,
        DEPTH_METER: true,
        STATIC_WATER_LEVEL: true,
        DYNAMIC_WATER_LEVEL_METER: true,
        'DRAW _DOWN_METER': true,
        YIELD_METER_CUBED_PER_HOUR: true,
      },
    };
  },

  getActiveMetrics() {
    return Object.keys(this.state.metrics)
      .filter(metric => this.state.metrics[metric]);
  },

  parseData(data) {
    return this.getActiveMetrics().map(key => {
      return {
        label: key,
        values: Object.keys(data)
                  .filter(year => data[year])
                  .map(year => {
                    return {
                      x: year,
                      y: data[year].reduce((res, metric) => {
                        if (metric[key]) {
                          res.value = metric[key];
                        }
                        return res;
                      }, {value: 0}).value,
                      y0: 0,
                    };
                  }),
      };
    });
  },

  toogleMetric(e, metric) {
    const newState = {
      ...this.state,
      metrics: {
        ...this.state.metrics,
        [metric]: !this.state.metrics[metric],
      },
    };
    this.replaceState(newState);
  },

  render() {
    const dataRes = func.Result.sumByGroupBy(this.props.boreholes, 'YEAR_FROM', this.getActiveMetrics());
    if (Object.keys(dataRes).length === 0) {
      return false;
    }
    return (
      <div className="boreholes-stats-chart">
        <h3 className="chart-title"><T k="chart.title-boreholes-stats" /> - <span className="chart-helptext"><T k="chart.title-boreholes-stats-helptext" /></span></h3>
        <WaterpointstatusOptions onclick={this.toogleMetric} state={this.state.metrics} values={Object.keys(this.state.metrics)}/>
        <div className="chart-container ">
          <TSetChildProps>
            <LineChart
                colorScale={c.Color.getBoreholesColor}
                data={this.parseData(dataRes)}
                height={300}
                margin={{top: 10, bottom: 50, left: 50, right: 10}}
                width={this.state.size.width * 0.60}
                xAxis={{innerTickSize: 6, label: {k: 'chart.boreholes-stats.x-axis'}}}
                yAxis={{innerTickSize: 6, label: {k: 'chart.boreholes-stats.y-axis'}}} />
              </TSetChildProps>
        </div>
      </div>
    );
  },
});

export default BoreholesStatsChart;
