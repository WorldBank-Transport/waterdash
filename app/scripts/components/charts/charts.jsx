import React, { PropTypes } from 'react';
import DataTypes from '../../constants/data-types';
import ViewModes from '../../constants/view-modes';
import OpenClosed from  '../../constants/open-closed';

// import WaterpointStatusChart from './waterpoint-status-chart';
// import WaterpointFunctionalChart from './waterpoint-functional-chart';
// import WaterpointPopulationServeChart from './waterpoint-population-serve-chart';


const Charts = React.createClass({
  propTypes: {
    children: PropTypes.node,
    data: PropTypes.array,  // injected
    dataType: PropTypes.instanceOf(DataTypes.OptionClass),  // injected
    openClosed: PropTypes.instanceOf(OpenClosed.OptionClass),
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),  // injected
  },
  render() {
    return OpenClosed.match(this.props.openClosed, {
      Open: () => (
        <div className="points-charts">
          <div className="secondaryCharts">
            {/*
            <div className="row"><WaterpointPopulationServeChart waterpoints={this.props.data}/></div>
            <div className="row"><WaterpointFunctionalChart waterpoints={this.props.data}/></div>
            */}
          </div>
          <div className="mainChart">
            {/*<WaterpointStatusChart waterpoints={this.props.data} />*/}
          </div>
        </div>
      ),
      Closed: () => <div style={{display: 'none'}}></div>,
    });
  },
});

export default Charts;
