import React, { PropTypes } from 'react';
import { connect } from 'reflux';
import isUndefined from 'lodash/lang/isUndefined';
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

  removeDuplicatePopulation(waterpoints) {
    const seen = {};
    const unique = (item) => seen.hasOwnProperty(item.VILLAGE) ? false : (seen[item.VILLAGE] = true);
    return waterpoints.filter(unique);
  },

  render() {
    const singleVillageWaterpoints = this.removeDuplicatePopulation(this.props.waterpoints);
    const waterpointsRes = func.Result.sumByGroupBy(singleVillageWaterpoints, 'REGION', ['POPULATION SERVED']);
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
