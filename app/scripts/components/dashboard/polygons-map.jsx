import React, { PropTypes } from 'react';

import DataTypes from '../../constants/data-types';
import ViewModes from '../../constants/view-modes';

import { TileLayer, GeoJson } from 'react-leaflet';
import BoundsMap from '../leaflet/bounds-map';


const PolygonsMap = React.createClass({
  propTypes: {
    children: PropTypes.node,  // for selected point
    data: PropTypes.array,  // injected
    dataType: PropTypes.instanceOf(DataTypes.OptionClass),  // injected
    polygonsData: PropTypes.array,  // injected
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),  // injected
  },
  render() {
    return (
      <BoundsMap
          bounds={[[-0.8, 29.3], [-11.8, 40.8]]}
          className="leaflet-map">
        <TileLayer url="//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {this.props.polygonsData.map(feature => (
          <GeoJson
              data={feature}
              key={`${this.props.viewMode.toParam()}-${feature.id}`} />
        ))}
      </BoundsMap>
    );
  },
});

export default PolygonsMap;
