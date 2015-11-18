import React, { PropTypes } from 'react';
import { _ } from 'results';  // catch-all for match
import DataTypes from '../../constants/data-types';
import ViewModes from '../../constants/view-modes';
import OpenClosed from  '../../constants/open-closed';
import WaterpointsChart from './waterpoints-charts';
import DamsChart from './dams-chart';
import BoreholesCharts from './boreholes-charts';

require('stylesheets/charts/charts');

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
        <div className="charts">
          {DataTypes.match(this.props.dataType, {
            Waterpoints: () => (<WaterpointsChart {...this.props}/>),
            Dams: () => (<DamsChart {...this.props}/>),
            Boreholes: () => (<BoreholesCharts {...this.props}/>),
          })}
        </div>
      ),
      Closed: () => <div style={{display: 'none'}}></div>,
    });
  },
});

export default Charts;
