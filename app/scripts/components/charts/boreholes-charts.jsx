import React, { PropTypes } from 'react';
import { connect } from 'reflux';
import DataTypes from '../../constants/data-types';
import ViewModes from '../../constants/view-modes';
import OpenClosed from  '../../constants/open-closed';
import BoreholesStatsChart from './boreholes-stats-chart';
import BoreholesMetricsChart from './boreholes-metrics-charts';
import MetricSummary from './metric-summary-chart';
import { Result } from '../../utils/functional';
import * as metrics from '../../utils/metrics';
import { getNumberOr0 } from '../../utils/number';
import YearStore from '../../stores/year';
import TSetChildProps from '../misc/t-set-child-props';

require('stylesheets/charts/boreholes-chart');

const BoreholesCharts = React.createClass({

  propTypes: {
    children: PropTypes.node, // injected
    data: PropTypes.array,  // injected
    dataType: PropTypes.instanceOf(DataTypes.OptionClass),  // injected
    openClosed: PropTypes.instanceOf(OpenClosed.OptionClass), // injected
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),  // injected
  },

  mixins: [
    connect(YearStore, 'years'),
  ],

  getMetricsAvg() {
    const boreholesMetric = metrics.boreholesMetricCal;
    const metricSummary = Object.keys(boreholesMetric).map(metric => {
      const sum = Result.sumBy(this.props.data, metric);
      return {
        name: metric,
        value: boreholesMetric[metric](getNumberOr0(sum[metric]), sum.total),
      };
    });

    return {
      values: metricSummary,
    };
  },

  renderMainChart() {
    if (this.props.data.length === 0 || (Object.keys(this.state.years).filter(year => this.state.years[year]).length === 1)) {
      return false;
    }
    return (<div className="mainChart">
              <BoreholesStatsChart boreholes={this.props.data} years={this.state.years}/>
            </div>);
  },

  renderMetricCharts() {
    if (this.props.data.length === 0 || (Object.keys(this.state.years).filter(year => this.state.years[year]).length !== 1)) {
      return false;
    }
    const allMetrics = ['DIAMETER', 'DEPTH_METER', 'STATIC_WATER_LEVEL', 'DYNAMIC_WATER_LEVEL_METER', 'DRAW _DOWN_METER', 'YIELD_METER_CUBED_PER_HOUR'];
    const dataRes = Result.sumByGroupBy(this.props.data, 'REGION', allMetrics);
    return (
      <div className="mainChart">
        <TSetChildProps>
          <BoreholesMetricsChart chartId="boreholes-size" metrics={['DIAMETER', 'DEPTH_METER']} stats={dataRes} title={{k: 'chart.borehole-size.title'}}/>
        </TSetChildProps>
        <TSetChildProps>
          <BoreholesMetricsChart chartId="boreholes-level" metrics={['STATIC_WATER_LEVEL', 'DYNAMIC_WATER_LEVEL_METER']} stats={dataRes} title={{k: 'chart.borehole-level.title'}}/>
        </TSetChildProps>
        <TSetChildProps>
          <BoreholesMetricsChart chartId="boreholes-draw" metrics={['DRAW _DOWN_METER']} stats={dataRes} title={{k: 'chart.borehole-draw.title'}}/>
        </TSetChildProps>
        <TSetChildProps>
          <BoreholesMetricsChart chartId="boreholes-draw" metrics={['YIELD_METER_CUBED_PER_HOUR']} stats={dataRes} title={{k: 'chart.borehole-yield.title'}}/>
        </TSetChildProps>
      </div>);
  },

  render() {
    const metricSumary = this.getMetricsAvg();
    return (
      <div className="container borehole-chart-container">
        <div className="secondaryCharts">
          <div className="row">
            {this.renderMainChart()}
            {this.renderMetricCharts()}
          </div>
          <div className="row">
            <MetricSummary format={(value) => value.toFixed(2)} metric={metricSumary} title="chart.boreholes.summary" viewMode={this.props.viewMode} />
          </div>
        </div>
      </div>);
  },
});

export default BoreholesCharts;
