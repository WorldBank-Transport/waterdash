import React, { PropTypes } from 'react';
import {BarChart} from 'react-d3';
import * as func from '../../../utils/functional';

require('stylesheets/dashboard/charts/stack-bar-chart');

const StackBarChart = React.createClass({
  propTypes: {
    data: PropTypes.object,
  },
  render() {
    const dataRes = func.Result.aggregate(this.props.data, 'STATUS', 'REGION');
    return dataRes.andThen(data => {
      if (data.keys.aggProps.length > 0) {
        const barData = Object.keys(data)
          .filter(key => key !== 'keys')
          .map(key => {
            return {
              name: key,
              values: data.keys.sumProps.map(status => {
                return {
                  x: status,
                  y: data[key][status] ? data[key][status] : 0,
                };
              }),
            };
          });
        return (<div className="stack-bar-chart">
                  <BarChart
                      data={barData}
                      fill={'#3182bd'}
                      height={200}
                      legend={true}
                      stackOffset={'wigget'}
                      title="Bar Chart"
                      width={500} />
                </div>
        );
      } else {
        return <div>no chart</div>;
      }
    });
  },
});

export default StackBarChart;
