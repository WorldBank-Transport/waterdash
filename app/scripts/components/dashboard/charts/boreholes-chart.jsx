import React, { PropTypes } from 'react';
import {BarChart} from 'react-d3';
import * as func from '../../../utils/functional';
import TSetChildProps from '../../misc/t-set-child-props';

require('stylesheets/dashboard/charts/boreholes-chart');

const StackBarChart = React.createClass({
  propTypes: {
    boreholes: PropTypes.array.isRequired,
  },

  parseData(data) {
    const compare = (a, b) => {
      return b.y - a.y;
    };
    return [{
      name: 'Boreholes',
      values: Object.keys(data)
                .filter(k => k !== 'total')
                .map(key => {
                  return {
                    x: key,
                    y: data[key],
                  };
                })
                .sort(compare),
    }];
  },

  render() {
    const dataRes = func.Result.countBy(this.props.boreholes, 'REGION');
    return (
      <div className="boreholes-chart">
        <TSetChildProps>
          <BarChart
              data={this.parseData(dataRes)}
              fill="#3182bd"
              height={200}
              title={{t: 'chart.boreholes.title' }}
              width={500}
              xAccessName={{t: 'chart.boreholes.x-axis' }}
              yAccessTitle={{t: 'chart.boreholes.y-axis' }} />
        </TSetChildProps>
      </div>);
  },
});

export default StackBarChart;
