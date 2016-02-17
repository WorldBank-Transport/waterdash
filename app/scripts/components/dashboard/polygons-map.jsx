import pick from 'lodash/object/pick';
import { Maybe } from 'results';
import React, { PropTypes } from 'react';
import { Map, LayerGroup, geoJson } from 'leaflet';
import Popup from '../../components/dashboard/popup';

import colours, { polygon as polyColour } from '../../utils/colours';
import DataTypes from '../../constants/data-types';
import ViewModes from '../../constants/view-modes';

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

  componentWillMount() {
    this.layerGroup = new LayerGroup(); // create Layer
  },

  shouldComponentUpdate(nextProps) {
    return this.props.polygonsData !== nextProps.polygonsData
      || this.props.selected !== nextProps.selected;
  },

  componentDidUpdate(nextProps) {
    if (this.props.polygonsData !== nextProps.polygonsData) {
      this.updateMap();
    }
  },

  componentWillUnmount() {
    if (this.layerGroup) {
      this.layerGroup.clearLayers();
      delete this.layerGroup;
    }
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

  renderPopup() {
    const propsForPopup = pick(this.props,
      [ 'data', 'dataType', 'deselect', 'selected', 'viewMode']);
    return (<Popup {...propsForPopup}/>);
  },

  onEachFeature(feature, layer) {
    layer.on('click', this.handleClickFor(feature));
    layer.on('mouseout', this.handleMouseoutFor(feature));
    layer.on('mouseover', this.handleMouseover(feature));
  },

  updateMap() {
    this.layerGroup.clearLayers();
    const polygons = new geoJson(this.props.polygonsData, {
      style: (feature) => polyColour.normal(this.getFeatureColor(feature)),
      onEachFeature: this.onEachFeature,
    });
    this.layerGroup.addLayer(polygons);
    this.props.map.addLayer(this.layerGroup);
  },

  render() {
    return (
      <div>
        {/* popup overlay for polygon */}
        {this.renderPopup()}
        <Legend dataType={this.props.dataType} ranges={this.props.ranges} />
      </div>
    );
  },
});

export default PolygonsMap;
