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
      label: 'People Waterpoint Ratio',
      values: [],
    };
    const population = this.state.population;
    const comparator = (a, b) => b.y - a.y;
    response.values = Object.keys(waterpoints)
                        .filter(key => key !== 'total')
                        .map(key => {
                          const regPopulation = isUndefined(population[key]) ? 0 : population[key]; // if we don't have the population we show the real number
                          return {
                            x: key,
                            y: (regPopulation / waterpoints[key]),
                          };
                        }).sort(comparator);
    return response;
  },

  render() {
    const waterpointsRes = func.Result.countBy(this.props.waterpoints, 'REGION');
    return (
      <div className="waterpoint-population-serve-chart">
        <TSetChildProps>
          <BarChart
              data={this.parseData(waterpointsRes)}
              height={200}
              margin={{top: 10, bottom: 50, left: 50, right: 10}}
              width={500}
              xAxis={{label: {k: 'chart.waterpoints-people-ratio.x-axis'}}}
              yAxis={{label: {k: 'chart.waterpoints-people-ratio.y-axis'}}} />
        </TSetChildProps>
      </div>);
  },
});

export default WaterpointPopulationServeChart;
