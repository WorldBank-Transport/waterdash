import React, { PropTypes } from 'react';
import {BarChart} from 'react-d3';
import * as func from '../../../utils/functional';

require('stylesheets/dashboard/charts/waterpoint-functional-chart');

const WaterpointFunctionalChart = React.createClass({
  propTypes: {
    waterpoints: PropTypes.array.isRequired,
  },

  parseData(waterpoints) {
    const comparator = (a, b) => b.y - a.y;
    return [{
      name: '% Functional',
      values: Object.keys(waterpoints).map(key => {
        return {
          x: key,
          y: (waterpoints[key].FUNCTIONAL / waterpoints[key].total * 100),
        };
      }).sort(comparator),
    }];
  },

  render() {
    const waterpointsRes = func.Result.countByGroupBy(this.props.waterpoints, 'REGION', 'STATUS');
    return (
      <div className="waterpoint-functional-chart">
        <BarChart
            data={this.parseData(waterpointsRes)}
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
