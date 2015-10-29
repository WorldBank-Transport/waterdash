import React, { PropTypes } from 'react';
import { Map } from 'leaflet';

import colours from '../../utils/colours';
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
  renderFeature(feature) {
    // prefix the key with the viewMode, since regions districts might have the same name
    const key = `${this.props.viewMode.toParam()}-${feature.id}`;

    const pathStyle = {
      color: '#fff',
      fillOpacity: 0.75,
      opacity: 0.6,
      weight: 2,
      fillColor: feature.properties.data.and('purple').unwrapOr(colours.unknown),
    };

    return <GeoJson data={feature} key={key} map={this.props.map} {...pathStyle} />;
  },
  render() {
    return (
      <div style={{display: 'none'}}>
        {this.props.polygonsData.map(this.renderFeature)}
      </div>
    );
  },
});

export default PolygonsMap;
