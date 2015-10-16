import React, { PropTypes } from 'react';
import { connect } from 'reflux';
import isObject from 'lodash/lang/isObject';
import {BarChart} from 'react-d3-components';
import PopulationStore from '../../../stores/population';
import * as func from '../../../utils/functional';
import TSetChildProps from '../../misc/t-set-child-props';
import {load} from '../../../actions/population';

require('stylesheets/dashboard/charts/waterpoint-population-serve-chart');

const WaterpointPopulationServeChart = React.createClass({
  propTypes: {
    waterpoints: PropTypes.array.isRequired,
  },
  mixins: [
    connect(PopulationStore, 'population'),
  ],
  componentDidMount() {
    load();
  },

  parseData(waterpoints) {
    const response = {
      label: '% Population Served',
      values: [],
    };
    if (isObject(this.state.population)) {
      const population = this.state.population;
      const comparator = (a, b) => b.y - a.y;
      response.values = Object.keys(waterpoints).map(key => {
        return {
          x: key,
          y: (waterpoints[key][0]['POPULATION SERVED'] / population[key] * 100),
        };
      }).sort(comparator);
    }
    return response;
  },

  render() {
    const waterpointsRes = func.Result.sumByGroupBy(this.props.waterpoints, 'REGION', ['POPULATION SERVED']);
    return (
      <div className="waterpoint-population-serve-chart">
        <TSetChildProps>
          <BarChart
              data={this.parseData(waterpointsRes)}
              height={200}
              margin={{top: 10, bottom: 50, left: 50, right: 10}}
              width={500}
              xAxis={{label: {k: 'chart.functional-waterpoints.x-axis'}}}
              yAxis={{label: {k: 'chart.functional-waterpoints.y-axis'}}} />
        </TSetChildProps>
      </div>);
  },
});

export default WaterpointPopulationServeChart;
