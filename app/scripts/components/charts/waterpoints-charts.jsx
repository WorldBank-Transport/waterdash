import React, { PropTypes } from 'react';
import DataTypes from '../../constants/data-types';
import ViewModes from '../../constants/view-modes';
import OpenClosed from  '../../constants/open-closed';
import WaterpointStatusChart from './waterpoint-status-chart';
import MetricSummary from './metric-summary-chart';
import WaterpointPopulationServeChart from './waterpoint-population-serve-chart';
import * as func from '../../utils/functional';


const WaterpointsChart = React.createClass({
  propTypes: {
    children: PropTypes.node, // injected
    data: PropTypes.array,  // injected
    dataType: PropTypes.instanceOf(DataTypes.OptionClass),  // injected
    openClosed: PropTypes.instanceOf(OpenClosed.OptionClass), // injected
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),  // injected
  },

  getTopProblems() {
    const data = func.Result.countBy(this.props.data, 'HARDWARE_PROBLEM');
    const problems = Object.keys(data)
                  .filter(key => key !== 'NONE' && key !== 'total')
                  .map(key => {
                    return {
                      name: key,
                      value: data[key],
                    };
                  })
                  .sort((a, b) => b.value - a.value);
    return {
      values: problems,
      total: data.total,
    };
  },

  render() {
    const topProblems = this.getTopProblems();
    return (
      <div className="container">
        <div className="secondaryCharts">
          <div className="col-left">
            <div className="mainChart">
              <WaterpointStatusChart waterpoints={this.props.data} />
            </div>
          </div>
          <div className="col-right">
            <MetricSummary metric={topProblems} showPercentage={true} title="chart.waterpoint.summary.top-problem"/>
          </div>
          <div className="col-right">
            <WaterpointPopulationServeChart waterpoints={this.props.data}/>
          </div>
        </div>
      </div>);
  },
});

export default WaterpointsChart;
