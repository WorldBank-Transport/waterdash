/**
 * TODO: remove waterpoints-specific hardcoded stuff from this module
 * so that it will be easier to add points for boreholes and dams (if
 * we ever get that data)
 */

import { Map, CircleMarker, LayerGroup } from 'leaflet';
import React, { PropTypes } from 'react';
import colours, { point } from '../../utils/colours';
import isNaN from 'lodash/lang/isNaN';


const SimplePoints = React.createClass({
  propTypes: {
    deselect: PropTypes.func,
    map: PropTypes.instanceOf(Map),  // injected by BoundsMap
    points: PropTypes.array.isRequired,
    select: PropTypes.func,
  },

  componentWillMount() {
    this.layerGroup = new LayerGroup(); // create Layer
  },

  componentDidMount() {
    this.updateMap();
  },

  shouldComponentUpdate(nextProps) {
    return nextProps.points !== this.props.points;
  },

  componentDidUpdate() {
    this.updateMap();
  },

  componentWillUnmount() {
    this.layerGroup.clearLayers();
    this.props.map.removeLayer(this.layerGroup);
  },

  updateMap() {
    const invalidLatLon = (item) => item.position && !isNaN(item.position[0]) && !isNaN(item.position[1]);
    this.layerGroup.clearLayers();
    this.props.points.filter(invalidLatLon).map(this.createMarker);
    this.props.map.addLayer(this.layerGroup);
  },

  createMarker(item) {
    const color = colours.theme;
    const m = new CircleMarker(item.position, point.normal(color));
    m.setOpacity = () => null;  // PruneCluster tries to call this
    m.on('click', this.handleMarkerClickFor(item.POINT_ID));
    m.on('mouseout', this.handleMouseoutFor(color));
    m.on('mouseover', this.handleMouseover(item.POINT_ID));
    this.layerGroup.addLayer(m);
    return m;
  },

  handleMarkerClickFor(id) {
    return () => this.props.select(id);
  },

  handleMouseoutFor(color) {
    return e => {
      e.target.setStyle(point.normal(color));
    };
  },

  handleMouseover() {
    return (e) => {
      e.target.setStyle(point.hovered);
    };
  },

  render() {
    return <div style={{display: 'none'}}></div>;
  },
});

export default SimplePoints;
