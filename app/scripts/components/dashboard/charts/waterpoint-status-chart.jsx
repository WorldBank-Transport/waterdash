import React, { PropTypes } from 'react';
import {BarChart} from 'react-d3';
import * as func from '../../../utils/functional';

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
              name: key,
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
        <BarChart
            data={this.parseData(dataRes)}
            fill="#3182bd"
            height={200}
            legend={true}
            stackOffset="wigget"
            title="Waterpoint status"
            width={500}
            xAxisLabel="Regions"
            yAxisLabel="Status" />
      </div>);
  },
});

export default WaterpointStatusChart;
