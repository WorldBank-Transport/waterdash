import React, { PropTypes } from 'react';
import {LineChart} from 'react-d3-components';
import * as func from '../../../utils/functional';
import TSetChildProps from '../../misc/t-set-child-props';
import T from '../../misc/t';

require('stylesheets/dashboard/charts/boreholes-stats-chart');

const BoreholesStatsChart = React.createClass({
  propTypes: {
    boreholes: PropTypes.array.isRequired,
  },

  getInitialState() {
    return {
      DIAMETER: true,
      DEPTH_METER: true,
      STATIC_WATER_LEVEL: true,
      DYNAMIC_WATER_LEVEL_METER: true,
      'DRAW _DOWN_METER': true,
      YIELD_METER_CUBED_PER_HOUR: true,
    };
  },

  getActiveMetrics() {
    return Object.keys(this.state)
      .filter(metric => this.state[metric])
      .map(metric => metric);
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
                          res = metric[key];
                        }
                        return res;
                      }, 0),
                      y0: 0,
                    };
                  }),
      };
    });
  },

  toogleMetric(e, metric) {
    this.state[metric] = !this.state[metric];
    this.setState(this.state);
  },

  render() {
    const dataRes = func.Result.sumByGroupBy(this.props.boreholes, 'YEAR_FROM', this.getActiveMetrics());
    return (
      <div className="boreholes-stats-chart">
        <TSetChildProps>
          <LineChart
              data={this.parseData(dataRes)}
              height={200}
              margin={{top: 10, bottom: 50, left: 50, right: 10}}
              title={{k: 'chart.boreholes.title' }}
              width={800} />
        </TSetChildProps>
        <lu className="boreholes-options">
          {Object.keys(this.state).map(metric =>
            (<li className="option">
              <input checked={this.state[metric] ? 'checked' : ''} id={`borehole-${metric}`} name={metric} onChange={e => this.toogleMetric(e, metric)} type="checkbox" />
              <T k={`chart.boreholes.${metric}`} />
            </li>)
          )}
        </lu>
      </div>);
  },
});

export default BoreholesStatsChart;
