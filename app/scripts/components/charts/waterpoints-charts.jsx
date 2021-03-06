import React, { PropTypes } from 'react';
import { connect } from 'reflux';
import DataTypes from '../../constants/data-types';
import ViewModes from '../../constants/view-modes';
import OpenClosed from  '../../constants/open-closed';
import WaterpointStatusChart from './waterpoint-status-chart';
import MetricSummary from './metric-summary-chart';
import TotalServedPopulationChart from './total-served-population-chart';
import WaterpointPopulationServeChart from './waterpoint-population-serve-chart';
import * as func from '../../utils/functional';
import WaterpointPieChart from './waterpoint-pie-chart';
import PieChartDataStore from '../../stores/pie-chart';

require('stylesheets/charts/charts');

const WaterpointsChart = React.createClass({
  propTypes: {
    children: PropTypes.node, // injected
    data: PropTypes.array,  // injected
    dataType: PropTypes.instanceOf(DataTypes.OptionClass),  // injected
    openClosed: PropTypes.instanceOf(OpenClosed.OptionClass), // injected
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),  // injected
  },

  mixins: [
    connect(PieChartDataStore, 'pieChartData'),
  ],

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
    return (
      <div className="container">
        <div className="secondaryCharts">
          <div className="row">
            <div className="mainChart">
              <WaterpointStatusChart viewMode={this.props.viewMode} waterpoints={this.props.data} />
            </div>
          </div>
          <div className="row">
            <MetricSummary metric={topProblems} showPercentage={true} title="chart.waterpoint.summary.top-problem" viewMode={this.props.viewMode} />
          </div>
          <div className="row">
            <WaterpointPopulationServeChart viewMode={this.props.viewMode} waterpoints={this.props.data}/>
          </div>
          <div className="row">
            <TotalServedPopulationChart viewMode={this.props.viewMode}/>
          </div>
          <div className="col-all">
            <div className="row-chart-left">
              <WaterpointPieChart column="WATER_QUALITY" data={this.state.pieChartData} id= "container-pie-1" />
            </div>
            <div className="row-chart-left">
              <WaterpointPieChart column="WATER_QUANTITY" data={this.state.pieChartData} id= "container-pie-2" />
            </div>
            <div className="row-chart-left">
              <WaterpointPieChart column="SOURCE_TYPE" data={this.state.pieChartData} id= "container-pie-3" />
            </div>
          </div>
        </div>
      </div>);
  },
});

export default WaterpointsChart;
