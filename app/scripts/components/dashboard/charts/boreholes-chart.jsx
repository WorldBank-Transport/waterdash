import React, { PropTypes } from 'react';
import {BarChart} from 'react-d3-components';
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
      label: 'Boreholes',
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
              height={200}
              margin={{top: 10, bottom: 50, left: 50, right: 10}}
              title={{k: 'chart.boreholes.title' }}
              width={500}
              xAxisLabel={{k: 'chart.boreholes.x-axis' }}
              yAxisLabel={{k: 'chart.boreholes.y-axis' }} />
        </TSetChildProps>
      </div>);
  },
});

export default StackBarChart;
