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
      DIAMETER: {enabled: true, color: '#FA8072' },
      DEPTH_METER: {enabled: true, color: '#FF4500' },
      STATIC_WATER_LEVEL: {enabled: true, color: '#87CEEB' },
      DYNAMIC_WATER_LEVEL_METER: {enabled: true, color: '#000080' },
      'DRAW _DOWN_METER': {enabled: true, color: '#DDA0DD' },
      YIELD_METER_CUBED_PER_HOUR: {enabled: true, color: '#4B0082' },
    };
  },

  getActiveMetrics() {
    return Object.keys(this.state)
      .filter(metric => this.state[metric].enabled);
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
      [metric]: {
        ...this.state[metric],
        enabled: !this.state[metric].enabled,
      },
    };
    this.replaceState(newState);
  },

  render() {
    const dataRes = func.Result.sumByGroupBy(this.props.boreholes, 'YEAR_FROM', this.getActiveMetrics());
    const colorScale = (x) => {
      return this.state[x].color;
    };
    return (
      <div className="boreholes-stats-chart">
        <TSetChildProps>
          <LineChart
              colorScale={colorScale}
              data={this.parseData(dataRes)}
              height={200}
              margin={{top: 10, bottom: 50, left: 50, right: 10}}
              width={800}
              xAxis={{innerTickSize: 6, label: {k: 'chart.boreholes-stats.x-axis'}}}
              yAxis={{innerTickSize: 6, label: {k: 'chart.boreholes-stats.y-axis'}}} />
        </TSetChildProps>
        <lu className="boreholes-options">
          {Object.keys(this.state).map(metric =>
            (<li className="option" style={{color: this.state[metric].color}}>
              <input checked={this.state[metric].enabled ? 'checked' : ''} id={`borehole-${metric}`} name={metric} onChange={e => this.toogleMetric(e, metric)} type="checkbox" />
              <T k={`chart.boreholes.${metric}`} />
            </li>)
          )}
        </lu>
      </div>);
  },
});

export default BoreholesStatsChart;
