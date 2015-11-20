import React, { PropTypes } from 'react';
import DataTypes from '../../constants/data-types';
import ViewModes from '../../constants/view-modes';
import OpenClosed from  '../../constants/open-closed';
import WaterpointStatusChart from './waterpoint-status-chart';
import MetricSummary from './metric-summary-chart';
import WaterpointPopulationServeChart from './waterpoint-population-serve-chart';
import * as func from '../../utils/functional';
import WaterpointPieChart from './waterpoint-pie-chart';


const WaterpointsChart = React.createClass({
  propTypes: {
    children: PropTypes.node, // injected
    data: PropTypes.array,  // injected
    dataType: PropTypes.instanceOf(DataTypes.OptionClass),  // injected
    openClosed: PropTypes.instanceOf(OpenClosed.OptionClass), // injected
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),  // injected
  },

  getAggregatedValues(field, filter) {
    const data = func.Result.countBy(this.props.data, field);
    const problems = Object.keys(data)
                  .filter(filter)
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
    const topProblems = this.getAggregatedValues('HARDWARE_PROBLEM', key => key !== 'NONE' && key !== 'total');
    const waterQuality = this.getAggregatedValues('WATER_QUALITY', key => key !== 'total');
    const waterQuantity = this.getAggregatedValues('WATER_QUANTITY', key => key !== 'total');
    const sourceType = this.getAggregatedValues('SOURCE_TYPE', key => key !== 'total');
    return (
      <div className="container">
        <div className="secondaryCharts">
          <div className="col-left">
            <div className="mainChart">
              <WaterpointStatusChart viewMode={this.props.viewMode} waterpoints={this.props.data} />
            </div>
          </div>
          <div className="col-right">
            <MetricSummary metric={topProblems} showPercentage={true} title="chart.waterpoint.summary.top-problem" viewMode={this.props.viewMode} />
          </div>
          <div className="col-right">
            <WaterpointPopulationServeChart viewMode={this.props.viewMode} waterpoints={this.props.data}/>
          </div>
          <div className="col-left">
            <WaterpointPieChart data={this.props.data} column='WATER_QUALITY'/>

          </div>
          <div className="col-left">
            <WaterpointPieChart data={this.props.data} column='WATER_QUANTITY'/>
            
          </div>
          <div className="col-right">
            <WaterpointPieChart data={this.props.data} column='SOURCE_TYPE'/>
          </div>
        </div>
      </div>);
  },
});

export default WaterpointsChart;
