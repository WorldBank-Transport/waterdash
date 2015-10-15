import React, { PropTypes } from 'react';
import {BarChart} from 'react-d3-components';
import * as func from '../../../utils/functional';
import TSetChildProps from '../../misc/t-set-child-props';

require('stylesheets/dashboard/charts/stack-bar-chart');

const WaterpointStatusChart = React.createClass({
  propTypes: {
    waterpoints: PropTypes.array.isRequired,
  },

  getAllValues(data) {
    const returnValue = [];
    Object.keys(data)
      .map(item => {
        Object.keys(data[item])
          .filter(key => key !== 'total')
          .map(value => returnValue.push(value));
      });
    return returnValue;
  },

  parseData(data) {
    const allVal = this.getAllValues(data);
    const compare = (a, b) => {
      return b.y - a.y;
    };
    return Object.keys(data)
          .filter(key => key !== 'keys')
          .map(key => {
            return {
              label: key,
              values: allVal.map(status => {
                return {
                  x: status,
                  y: data[key][status] ? data[key][status] : 0,
                };
              }).sort(compare),
            };
          });
  },

  render() {
    const dataRes = func.Result.countByGroupBy(this.props.waterpoints, 'STATUS', 'REGION');
    return (
      <div className="stack-bar-chart">
        <TSetChildProps>
          <BarChart
              data={this.parseData(dataRes)}
              height={200}
              margin={{top: 10, bottom: 50, left: 50, right: 10}}
              width={500}
              xAxis={{innerTickSize: 6, label: {k: 'chart.status-waterpoints.x-axis'}}}
              yAxis={{innerTickSize: 6, label: {k: 'chart.status-waterpoints.y-axis'}}} />
          </TSetChildProps>
      </div>);
  },
});

export default WaterpointStatusChart;
