import React, { PropTypes } from 'react';
import {BarChart} from 'react-d3';
import * as func from '../../../utils/functional';

require('stylesheets/dashboard/charts/waterpoint-functional-chart');

const WaterpointFunctionalChart = React.createClass({
  propTypes: {
    data: PropTypes.object.isRequired,
  },

  parseData(data) {
    const comparator = (a, b) => b.y - a.y;
    return [{
      name: '% Functional',
      values: Object.keys(data).map(key => {
          return {
            x: key,
            y: (data[key].FUNCTIONAL / data[key].total * 100),
          };
        }).sort(comparator)
    }];
  },

  render() {
    const dataRes = func.Result.countByGroupBy(this.props.data, 'REGION', 'STATUS');
    return (
      <div className="waterpoint-functional-chart">
        <BarChart
            data={this.parseData(dataRes)}
            fill="#3182bd"
            height={200}
            title="Functional WaterPoints"
            width={500} 
            xAxisLabel="Regions"
            yAxisLabel="%"/>
      </div>);
  },
});

export default WaterpointFunctionalChart;
