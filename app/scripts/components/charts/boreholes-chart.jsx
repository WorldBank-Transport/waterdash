import React, { PropTypes } from 'react';
import {BarChart} from 'react-d3-components';
import * as func from '../../utils/functional';
import TSetChildProps from '../misc/t-set-child-props';
import Resize from '../../utils/resize-mixin';
import ShouldRenderMixin from '../../utils/should-render-mixin';

require('stylesheets/charts/boreholes-chart');

const BoreholesChart = React.createClass({
  propTypes: {
    boreholes: PropTypes.array.isRequired,
  },

  mixins: [
    Resize,
    ShouldRenderMixin,
  ],

  getInitialState() {
    return {};
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
    if (Object.keys(dataRes).length === 0) {
      return false;
    }
    return (
      <div className="boreholes-chart">
        <TSetChildProps>
          <BarChart
              data={this.parseData(dataRes)}
              height={300}
              margin={{top: 10, bottom: 50, left: 50, right: 10}}
              width={this.state.size.width * 0.60}
              xAxis={{label: {k: 'chart.boreholes.x-axis' }}}
              yAxis={{label: {k: 'chart.boreholes.y-axis' }}} />
        </TSetChildProps>
      </div>);
  },
});

export default BoreholesChart;
