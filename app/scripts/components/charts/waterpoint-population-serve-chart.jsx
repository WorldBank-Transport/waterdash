import isUndefined from 'lodash/lang/isUndefined';
import React, { PropTypes } from 'react';
import { connect } from 'reflux';
import {BarChart} from 'react-d3-components';
import PopulationStore from '../../../stores/population';
import * as func from '../../../utils/functional';
import TSetChildProps from '../../misc/t-set-child-props';
import {load} from '../../../actions/population';
import T from '../../misc/t';
import Resize from '../../../utils/resize-mixin';

require('stylesheets/charts/waterpoint-population-serve-chart');

const WaterpointPopulationServeChart = React.createClass({
  propTypes: {
    waterpoints: PropTypes.array.isRequired,
  },
  mixins: [
    connect(PopulationStore, 'population'),
    Resize,
  ],

  getInitialState() {
    load();
    return {};
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
    if (isUndefined(this.state.size)) {
      return (<div>empty</div>);
    }
    const waterpointsRes = func.Result.countBy(this.props.waterpoints, 'REGION');
    return (
      <div className="waterpoint-population-serve-chart">
        <h3 className="chart-title"><T k="chart.title-population-served" /> - <span className="chart-helptext"><T k="chart.title-title-population-served-helptext" /></span></h3>
        <div className="chart-container ">
          <TSetChildProps>
            <BarChart
                data={this.parseData(waterpointsRes)}
                height={200}
                margin={{top: 10, bottom: 50, left: 50, right: 10}}
                width={this.state.size.width * 0.25}
                xAxis={{label: {k: 'chart.waterpoints-people-ratio.x-axis'}}}
                yAxis={{label: {k: 'chart.waterpoints-people-ratio.y-axis'}}} />
          </TSetChildProps>
        </div>
      </div>);
  },
});

export default WaterpointPopulationServeChart;
