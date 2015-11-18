import React, { PropTypes } from 'react';
import DataTypes from '../../constants/data-types';
import ViewModes from '../../constants/view-modes';
import OpenClosed from  '../../constants/open-closed';
import BoreholesStatsChart from './boreholes-stats-chart';
import MetricSummary from './metric-summary-chart';
import BoreholesChart from './boreholes-chart';
import * as func from '../../utils/functional';
import * as metrics from '../../utils/metrics';
import { getNumberOr0 } from '../../utils/number';

const BoreholesCharts = React.createClass({

  propTypes: {
    children: PropTypes.node, // injected
    data: PropTypes.array,  // injected
    dataType: PropTypes.instanceOf(DataTypes.OptionClass),  // injected
    openClosed: PropTypes.instanceOf(OpenClosed.OptionClass), // injected
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),  // injected
  },

  getMetricsAvg() {
    const boreholesMetric = metrics.boreholesMetricCal;
    const metricSummary = Object.keys(boreholesMetric).map(metric => {
      const sum = func.Result.sumBy(this.props.data, metric);
      return {
        name: metric,
        value: boreholesMetric[metric](getNumberOr0(sum[metric]), sum.total),
      };
    });

    return {
      values: metricSummary,
    };
  },

  render() {
    const metricSumary = this.getMetricsAvg();
    return (
      <div className="container">
        <div className="secondaryCharts">
          <div className="col-left">
            <div className="mainChart">
              <BoreholesStatsChart boreholes={this.props.data} />
              <BoreholesChart boreholes={this.props.data} />
            </div>
          </div>
          <div className="col-right">
            <MetricSummary format={(value) => value.toFixed(2)} metric={metricSumary} title="chart.boreholes.summary" viewMode={this.props.viewMode} />
          </div>
        </div>
      </div>);
  }
});

export default BoreholesCharts;
