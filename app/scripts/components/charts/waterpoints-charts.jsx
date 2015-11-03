import React, { PropTypes } from 'react';
import DataTypes from '../../constants/data-types';
import ViewModes from '../../constants/view-modes';
import OpenClosed from  '../../constants/open-closed';
import WaterpointStatusChart from './waterpoint-status-chart';
import WaterpointFunctionalChart from './waterpoint-functional-chart';
import WaterpointPopulationServeChart from './waterpoint-population-serve-chart';


const WaterpointsChart = React.createClass({
  propTypes: {
    children: PropTypes.node, // injected
    data: PropTypes.array,  // injected
    dataType: PropTypes.instanceOf(DataTypes.OptionClass),  // injected
    openClosed: PropTypes.instanceOf(OpenClosed.OptionClass), // injected
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),  // injected
  },

  render() {
    return (
      <div className="container">
        <div className="secondaryCharts">
          <div className="col-left">
            <div className="mainChart">
              <WaterpointStatusChart viewMode={this.props.viewMode} waterpoints={this.props.data} />
            </div>
          </div>
          <div className="col-right">
            <WaterpointFunctionalChart viewMode={this.props.viewMode} waterpoints={this.props.data}/>
          </div>
          <div className="col-right">
            <WaterpointPopulationServeChart viewMode={this.props.viewMode} waterpoints={this.props.data}/>
          </div>
        </div>
      </div>);
  },
});

export default WaterpointsChart;
