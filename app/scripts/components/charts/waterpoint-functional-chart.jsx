import React, { PropTypes } from 'react';
import {BarChart} from 'react-d3-components';
import * as func from '../../utils/functional';
import TSetChildProps from '../misc/t-set-child-props';
import T from '../misc/t';
import Resize from '../../utils/resize-mixin';
import ViewModes from '../../constants/view-modes';
import ShouldRenderMixin from '../../utils/should-render-mixin';

require('stylesheets/charts/waterpoint-functional-chart');

const WaterpointFunctionalChart = React.createClass({
  propTypes: {
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),
    waterpoints: PropTypes.array.isRequired,
  },

  mixins: [Resize, ShouldRenderMixin],

  getInitialState() {
    return {};
  },

  parseData(waterpoints) {
    const comparator = (a, b) => b.y - a.y;
    return [{
      label: '% Functional',
      values: Object.keys(waterpoints).map(key => {
        return {
          x: key,
          y: (waterpoints[key].FUNCTIONAL / waterpoints[key].total * 100),
        };
      }).sort(comparator),
    }];
  },

  render() {
    if (!this.state.size) {
      return (<div>empty</div>);
    }
    const drillDown = ViewModes.getDrillDown(this.props.viewMode);
    const waterpointsRes = func.Result.countByGroupBy(this.props.waterpoints, drillDown, 'STATUS');
    if(Object.keys(waterpointsRes).length == 0) {
      return false;
    }
    return (
      <div className="waterpoint-functional-chart">
        <h3 className="chart-title"><T k="chart.title-waterpoints-functional" /> - <span className="chart-helptext"><T k="chart.title-waterpoints-functional-helptext" /></span></h3>
        <div className="chart-container ">
          <TSetChildProps>
            <BarChart
                data={this.parseData(waterpointsRes)}
                height={180}
                margin={{top: 10, bottom: 50, left: 20, right: 10}}
                width={this.state.size.width * 0.25}
                xAxis={{label: {k: `chart.functional-waterpoints.x-axis-${drillDown}`}}}
                yAxis={{label: {k: 'chart.functional-waterpoints.y-axis'}}} />
              </TSetChildProps>
        </div>
      </div>

    );
  },
});

export default WaterpointFunctionalChart;
