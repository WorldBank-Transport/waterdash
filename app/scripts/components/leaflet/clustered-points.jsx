/**
 * TODO: remove waterpoints-specific hardcoded stuff from this module
 * so that it will be easier to add points for boreholes and dams (if
 * we ever get that data)
 */

import { Map, CircleMarker } from 'leaflet';
import { PruneCluster, PruneClusterForLeaflet } from './prune-cluster';
import React, { PropTypes } from 'react';
import ClusterIcon from './cluster-icon';
import colours, { polygon as polyColour } from '../../utils/colours';
import DataTypes from '../../constants/data-types';

const statuses = [
  'FUNCTIONAL',  // 0
  'FUNCTIONAL NEEDS REPAIR',  // 1
  'NON FUNCTIONAL',  // 2
  'NON FUNCTIONAL < 6M', // 3
  'NON FUNCTIONAL < 3M', // 4
  'NON FUNCTIONAL > 6M', // 5
  'NON FUNCTIONAL > 3M', // 6
  'UNKNOWN',
];

const statusCategory = {
  'FUNCTIONAL': 'good',
  'FUNCTIONAL NEEDS REPAIR': 'medium',
  'NON FUNCTIONAL': 'poor',
  'NON FUNCTIONAL < 6M': 'poor',
  'NON FUNCTIONAL < 3M': 'poor',
  'NON FUNCTIONAL > 6M': 'poor',
  'NON FUNCTIONAL > 3M': 'poor',
  'UNKNOWN': 'unknown',
};

const damsCategories = [colours.blue];

const statusCatColours = statuses.map(status => colours[statusCategory[status]]);

const ClusteredPoints = React.createClass({
  propTypes: {
    dataType: PropTypes.instanceOf(DataTypes.OptionClass),
    map: PropTypes.instanceOf(Map),  // injected by BoundsMap
    points: PropTypes.array.isRequired,
    select: PropTypes.func.isRequired,
  },
  componentWillMount() {
    this.pruneCluster = new PruneClusterForLeaflet();
    this.pruneCluster.BuildLeafletClusterIcon = cluster => {
      const categories = DataTypes.match(this.props.dataType, {
        Waterpoints: () => statusCatColours,
        Dams: () => damsCategories,
        Boreholes: () => [],
      });
      return new ClusterIcon({
        categories: categories,
        stats: cluster.stats,
        population: cluster.population,
        textColor: colours.textColor,
        bgColor: colours.bgColor,
      });
    };
    this.pruneCluster.BuildLeafletMarker = (marker, position) => {
      const pointColor = DataTypes.match(this.props.dataType, {
        Waterpoints: () => colours[statusCategory[statuses[marker.category]]] || colours.unknown,
        Dams: () => colours.blue,
        Boreholes: () => [],
      });
      const m = new CircleMarker(position, {
        radius: 8,
        color: '#fff',
        opacity: 0.75,
        weight: 1,
        fillOpacity: 1,
        fillColor: pointColor,
      });
      m.setOpacity = () => null;  // PruneCluster tries to call this
      m.on('click', this.handleMarkerClickFor(marker.data.id));  // TODO: does this callback ever get cleaned up when the marker is removed?
                                                                 // ... not sure how to hook into pruneCluster's marker removal to call .off()
      m.on('mouseout', this.handleMarkerMouseoutFor(pointColor));
      m.on('mouseover', this.handleMarkerMouseoverFor);
      return m;
    };
    const originalProcessView = this.pruneCluster.ProcessView;
    this.pruneCluster.ProcessView = () => {
      let clusterSize;
      const zoom = this.props.map.getZoom();
      //console.log(zoom);
      if (zoom < 3) {
        clusterSize = 35;
      } else if (zoom < 6) {
        clusterSize = 25;
      } else if (zoom < 8) {
        clusterSize = 18;
      } else if (zoom < 10) {
        clusterSize = 7;
      } else if (zoom < 12) {
        clusterSize = 3;
      } else if (zoom < 14) {
        clusterSize = 1;
      } else {
        clusterSize = 0.0000000000001; //decluster if zoom is greater than 13
      }
      this.pruneCluster.Cluster.Size = clusterSize;
      originalProcessView.apply(this.pruneCluster);
    };
    this.props.map.addLayer(this.pruneCluster);
    this.markerIdMap = {};
  },
  componentDidMount() {
    this.updateCluster();
  },
  shouldComponentUpdate(nextProps) {
    return nextProps.points !== this.props.points;
  },
  componentDidUpdate() {
    this.updateCluster();
  },
  componentWillUnmount() {
    this.props.map.removeLayer(this.pruneCluster);
    delete this.markerIdMap;
  },
  updateCluster() {
    const nextMap = {};
    this.pruneCluster.RemoveMarkers();
    // Existing markers: remove or keep
    this.props.points.forEach(point => {
      const id = point.POINT_ID;
      const marker = new PruneCluster.Marker(...point.position);
      marker.data.id = id;
      marker.category = statuses.indexOf(point.STATUS);
      nextMap[id] = marker;
      this.pruneCluster.RegisterMarker(marker);
    });

    // save the new map
    this.markerIdMap = nextMap;

    this.pruneCluster.ProcessView();
  },

  handleMarkerClickFor(id) {
    return () => this.props.select(id);
  },

  handleMarkerMouseoverFor(e) {
    e.target.setStyle(polyColour.hovered);
  },

  handleMarkerMouseoutFor(color) {
    return (e) => {
      e.target.setStyle(polyColour.normal(color));
    };
  },

  render() {
    return (
      <div style={{display: 'none'}}></div>
    );
  },
});

export default ClusteredPoints;
