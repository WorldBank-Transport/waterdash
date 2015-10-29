import React, { PropTypes } from 'react';
import { Map } from 'leaflet';

import colours, { polygon as polyColour } from '../../utils/colours';
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

  handleClickFor(feature) {
    return e => {
      console.log('clicked', e, feature);
    };
  },

  handleMouseoutFor(feature) {
    const colour = this.getFeatureColor(feature);
    return e => {
      e.target.setStyle(polyColour.normal(colour));
    };
  },

  handleMouseover(e) {
    e.target.setStyle(polyColour.hovered);
  },

  getFeatureColor(feature) {
    // TODO
    return feature.properties.data.and('purple').unwrapOr(colours.unknown);
  },

  renderFeature(feature) {
    // prefix the key with the viewMode, since regions districts might have the same name
    const key = `${this.props.viewMode.toParam()}-${feature.id}`;
    const pathStyle = polyColour.normal(this.getFeatureColor(feature));
    return (
      <GeoJson
          data={feature}
          key={key}
          map={this.props.map}
          onLeafletClick={this.handleClickFor(feature)}
          onLeafletMouseout={this.handleMouseoutFor(feature)}
          onLeafletMouseover={this.handleMouseover}
          {...pathStyle} />
    );
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
