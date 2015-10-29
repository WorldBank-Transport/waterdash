import React, { PropTypes } from 'react';
import { Map } from 'leaflet';

import DataTypes from '../../constants/data-types';
import ViewModes from '../../constants/view-modes';

import ClusteredWaterpoints from '../leaflet/clustered-points';


const PointsMap = React.createClass({
  propTypes: {
    children: PropTypes.node,  // for selected point
    data: PropTypes.array,  // injected
    dataType: PropTypes.instanceOf(DataTypes.OptionClass),  // injected
    map: PropTypes.instanceOf(Map),  // injected by BoundsMap
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),  // injected
  },
  render() {
    return <ClusteredWaterpoints map={this.props.map} points={this.props.data} />;
  },
});

export default PointsMap;
