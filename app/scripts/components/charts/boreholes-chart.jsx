import React, { PropTypes } from 'react';
import { connect } from 'reflux';
import {BarChart} from 'react-d3-components';
import * as func from '../../utils/functional';
import TSetChildProps from '../misc/t-set-child-props';
import T from '../misc/t';
import Resize from '../../utils/resize-mixin';
import ShouldRenderMixin from '../../utils/should-render-mixin';
import YearStore from '../../stores/year';
import WaterpointstatusOptions from './waterpoint-status-options';
import * as metrics from '../../utils/metrics';
import * as c from '../../utils/colours';
import { getNumberOr0 } from '../../utils/number';

require('stylesheets/charts/boreholes-chart');

const BoreholesChart = React.createClass({
  propTypes: {
    boreholes: PropTypes.array.isRequired,
  },

  mixins: [
    Resize,
    ShouldRenderMixin,
    connect(YearStore, 'years'),
  ],

  getInitialState() {
    return {
      metrics: {
        DIAMETER: true,
        DEPTH_METER: false,
        STATIC_WATER_LEVEL: false,
        DYNAMIC_WATER_LEVEL_METER: false,
        'DRAW _DOWN_METER': false,
        YIELD_METER_CUBED_PER_HOUR: false,
      },
    };
  },

  parseData(data, selected) {
    const compare = (a, b) => {
      return b.y - a.y;
    };
    const f = metrics.boreholesMetricCal[selected];
    return [{
      label: selected,
      values: Object.keys(data)
                .filter(k => k !== 'total')
                .map(key => {
                  return {
                    x: key,
                    y: f(getNumberOr0(data[key][0][selected]), data[key][0].total),
                  };
                })
                .sort(compare),
    }];
  },

  toogleMetric(e, metric) {
    const allFalse = Object.keys(this.state.metrics)
          .reduce((agg, m) => {
            agg[m] = false;
            return agg;
          }, {});
    const newState = {
      ...this.state,
      metrics: {
        ...allFalse,
        [metric]: true,
      },
    };
    this.replaceState(newState);
  },

  render() {
    const selected = Object.keys(this.state.metrics).filter(m => this.state.metrics[m])[0];
    const dataRes = func.Result.sumByGroupBy(this.props.boreholes, 'REGION', [selected]);
    if (Object.keys(dataRes).length === 0 || (Object.keys(this.state.years).filter(year => this.state.years[year]).length !== 1)) {
      return false;
    }
    return (
      <div className="boreholes-chart">
        <h3 className="chart-title"><T k={`chart.title-boreholes-metric.${selected}`} /> - <span className="chart-helptext"><T k={`chart.title-boreholes-metric-helptext.${selected}`} /></span></h3>
        <WaterpointstatusOptions onclick={this.toogleMetric} state={this.state.metrics} values={Object.keys(this.state.metrics)}/>
        <TSetChildProps>
          <BarChart
              colorScale={c.Color.getBoreholesColor}
              data={this.parseData(dataRes, selected)}
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
