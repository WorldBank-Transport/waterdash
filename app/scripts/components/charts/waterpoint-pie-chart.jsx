import React, { PropTypes } from 'react';
import * as func from '../../utils/functional';
import ShouldRenderMixin from '../../utils/should-render-mixin';
import {PieChart} from 'react-d3-components';
import T from '../misc/t';

require('stylesheets/charts/waterpoint-pie-chart');

const WaterpointPieChart = React.createClass({
  propTypes: {
    column: PropTypes.string,
    data: PropTypes.array,  // injected
  },

  mixins: [ShouldRenderMixin],

  parseData() {
    const data = func.Result.countBy(this.props.data, this.props.column);
    const values = Object.keys(data)
                    .filter(key => key !== 'total')
                    .map(key => {
                      return {
                        x: key,
                        y: data[key],
                      };
                    });
    return {
      label: 'Some Label',
      values: values,
    };
  },

  render() {
    return (
      <div className="waterpoint-pie-chart">
        <h3 className="chart-title"><T k={`chart.pie.${this.props.column}`} /></h3>
        <PieChart
            data={this.parseData()}
            height={300}
            margin={{top: 10, bottom: 50, left: 50, right: 10}}
            width={400}/>
      </div>
    );
  },
});

export default WaterpointPieChart;
