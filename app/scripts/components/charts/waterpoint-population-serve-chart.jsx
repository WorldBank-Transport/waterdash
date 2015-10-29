import isUndefined from 'lodash/lang/isUndefined';
import React, { PropTypes } from 'react';
import { connect } from 'reflux';
import * as func from '../../utils/functional';

import PopulationStore from '../../stores/population';

import { BarChart } from 'react-d3-components';
import TSetChildProps from '../misc/t-set-child-props';

require('stylesheets/charts/waterpoint-population-serve-chart');

const WaterpointPopulationServeChart = React.createClass({
  propTypes: {
    waterpoints: PropTypes.array.isRequired,
  },
  mixins: [
    connect(PopulationStore, 'population'),
  ],

  parseData(waterpoints) {
    const response = {
      label: '% Population Served',
      values: [],
    };
    const population = this.state.population;
    const comparator = (a, b) => b.y - a.y;
    response.values = Object.keys(waterpoints).map(key => {
      const regPopulation = isUndefined(population[key]) ? 100 : population[key]; // if we don't have the population we show the real number
      return {
        x: key,
        y: (waterpoints[key][0]['POPULATION SERVED'] / regPopulation * 100),
      };
    }).sort(comparator);
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
