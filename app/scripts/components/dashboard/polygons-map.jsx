import React, { PropTypes } from 'react';
import { Map } from 'leaflet';

import DataTypes from '../../constants/data-types';
import ViewModes from '../../constants/view-modes';

import { GeoJson } from 'react-leaflet';


const PolygonsMap = React.createClass({
  propTypes: {
    children: PropTypes.node,  // for selected point
    data: PropTypes.array,  // injected
    dataType: PropTypes.instanceOf(DataTypes.OptionClass),  // injected
    map: PropTypes.instanceOf(Map),  // injected by BoundsMap
    polygonsData: PropTypes.array,  // injected
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),  // injected
  },
  render() {
    return (
      <div style={{display: 'none'}}>
        {this.props.polygonsData.map(feature => (
          <GeoJson
              data={feature}
              key={`${this.props.viewMode.toParam()}-${feature.id}`}
              map={this.props.map} />
        ))}
      </div>
    );
  },
});

export default PolygonsMap;
