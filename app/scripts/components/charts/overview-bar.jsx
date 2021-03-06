import React, { PropTypes }from 'react';
import DataTypes from '../../constants/data-types';
import ViewModes from '../../constants/view-modes';
import WaterpointsOverviewBar from './waterpoints-overview-bar';
import DamsOverviewBar from './dams-overview-bar';
import BoreholeOverviewBar from './boreholes-overview-bar';

require('stylesheets/charts/overview-bar');

const OverviewBar = React.createClass({
  propTypes: {
    children: PropTypes.node,
    data: PropTypes.array,  // injected
    dataType: PropTypes.instanceOf(DataTypes.OptionClass),  // injected
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),  // injected
  },

  render() {
    const typedOverviewBar = DataTypes.match(this.props.dataType, {
      Waterpoints: () => (<WaterpointsOverviewBar {...this.props}/>), //{...propsForChildren}
      Boreholes: () => (<BoreholeOverviewBar {...this.props}/>),
      Dams: () => (<DamsOverviewBar {...this.props}/>),
    });
    return typedOverviewBar;
  },
});

export default OverviewBar;
