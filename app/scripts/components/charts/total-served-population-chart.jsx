import React, { PropTypes } from 'react';
import { connect } from 'reflux';
import {BarChart} from 'react-d3-components';
import ServedservedpopulationStore from '../../stores/servedpopulation';
import TSetChildProps from '../misc/t-set-child-props';
import {load} from '../../actions/servedpopulation';
import T from '../misc/t';
import Resize from '../../utils/resize-mixin';
import ShouldRenderMixin from '../../utils/should-render-mixin';
import ViewModes from '../../constants/view-modes';

require('stylesheets/charts/total-served-population-chart');

const TotalServedservedpopulationChart = React.createClass({
  propTypes: {
    data: PropTypes.array.isRequired,
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),
  },
  mixins: [
    connect(ServedservedpopulationStore, 'servedpopulation'),
    Resize,
    ShouldRenderMixin,
  ],

  getInitialState() {
    load();
    return {};
  },

  parseData(data) {
    const response = {
      label: 'Total Population Served',
      values: [],
    };

    const comparator = (a, b) => b.y - a.y;
    response.values = Object.keys(data).map(key => {
      const served = data;
      const item = served[key];
      return {
        x: item.YEAR.toString(),
        y: item.PERCENTAGE,
      };
    }).sort(comparator);
    return response;
  },

  render() {
    if (this.state.servedpopulation.length === 0) {
      return (<div>empty</div>);
    }
    return (
      <div className="total-servedpopulation-chart">
        <h3 className="chart-title"><T k="chart.waterpoint-total-servedpopulation" /> - <span className="chart-helptext"><T k="chart.waterpoint-total-servedpopulation-helptext" /></span></h3>
        <div className="chart-container ">
          <TSetChildProps>
            <BarChart
                data={this.parseData(this.state.servedpopulation)}
                height={350}
                margin={{top: 20, bottom: 100, left: 40, right: 10}}
                width={this.state.size.width * 0.55}
                xAxis={{label: {k: 'chart.boreholes-stats.x-axis'}}}
                yAxis={{label: {k: 'chart.waterpoint-total-servedpopulation.percenatge'}}} />
          </TSetChildProps>
        </div>
      </div>);
  },
});

export default TotalServedservedpopulationChart;
