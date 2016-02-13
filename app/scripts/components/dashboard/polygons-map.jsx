import pick from 'lodash/object/pick';
import { Maybe } from 'results';
import React, { PropTypes } from 'react';
import { Map } from 'leaflet';
import Popup from '../../components/dashboard/popup';

import colours, { polygon as polyColour } from '../../utils/colours';
import DataTypes from '../../constants/data-types';
import ViewModes from '../../constants/view-modes';

import { GeoJson, FeatureGroup } from 'react-leaflet';
import Legend from './legend';

const PolygonsMap = React.createClass({
  propTypes: {
    children: PropTypes.node,  // for selected point
    data: PropTypes.array,  // injected
    dataType: PropTypes.instanceOf(DataTypes.OptionClass),  // injected
    deselect: PropTypes.func,  // injected
    map: PropTypes.instanceOf(Map),  // injected by BoundsMap
    mapDrillDown: PropTypes.func,  // injected
    polygonsData: PropTypes.array,  // injected
    ranges: PropTypes.array,
    select: PropTypes.func,  // injected
    selected: PropTypes.instanceOf(Maybe.OptionClass),  // injected
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),  // injected
  },

  shouldComponentUpdate(nextProps) {
    return this.props.polygonsData !== nextProps.polygonsData
      || this.props.selected !== nextProps.selected;
  },

  handleClickFor(feature) {
    return () => this.props.mapDrillDown(feature.id);
  },

  handleMouseoutFor(feature) {
    const colour = this.getFeatureColor(feature);
    return e => {
      this.props.deselect();
      e.target.setStyle(polyColour.normal(colour));
    };
  },

  handleMouseover(feature) {
    return e => {
      //e.target.bringToFront();
      e.target.setStyle(polyColour.hovered);
      this.props.select(feature.id);
    };
  },

  colorize(d) {
    return this.props.ranges.find(r => d.length >= r.min && d.length <= r.max).color;
  },

  getFeatureColor(feature) {
    return feature.properties.data
      .andThen(this.colorize)
      .unwrapOr(colours.unknown);
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
          onLeafletMouseover={this.handleMouseover(feature)}
          {...pathStyle} />
    );
  },

  renderPopup() {
    const propsForPopup = pick(this.props,
      [ 'data', 'dataType', 'deselect', 'selected', 'viewMode']);
    return (<Popup {...propsForPopup}/>);
  },

  render() {
    return (
      <div>
        <FeatureGroup map={this.props.map}>
          {this.props.polygonsData.map(this.renderFeature)}
        </FeatureGroup>

        {/* popup overlay for polygon */}
        {this.renderPopup()}
        <Legend dataType={this.props.dataType} ranges={this.props.ranges} />
      </div>
    );
  },
});

export default PolygonsMap;
