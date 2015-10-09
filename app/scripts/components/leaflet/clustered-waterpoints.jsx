import { Map, CircleMarker } from 'leaflet';
import { PruneCluster, PruneClusterForLeaflet } from './prune-cluster';
import React, { PropTypes } from 'react';
import ClusterIcon from './cluster-icon';
import colours from '../../utils/colours';

const statuses = [
  'FUNCTIONAL',  // 0
  'FUNCTIONAL NEEDS REPAIR',  // 1
  'NON FUNCTIONAL',  // 2
];

const statusCategory = {
  'FUNCTIONAL': 'good',
  'FUNCTIONAL NEEDS REPAIR': 'medium',
  'NON FUNCTIONAL': 'poor',
};

const statusCatColours = statuses.map(status => colours[statusCategory[status]]);

const ClusteredWaterpoints = React.createClass({
  propTypes: {
    map: PropTypes.instanceOf(Map).isRequired,
    waterpoints: PropTypes.array.isRequired,
  },
  componentWillMount() {
    this.pruneCluster = new PruneClusterForLeaflet();
    this.pruneCluster.BuildLeafletClusterIcon = cluster => new ClusterIcon({
      categories: statusCatColours,
      stats: cluster.stats,
      population: cluster.population,
      textColor: colours.textColor,
      bgColor: colours.bgColor,
    });
    this.pruneCluster.BuildLeafletMarker = (marker, position) => {
      const m = new CircleMarker(position, {
        radius: 8,
        color: '#fff',
        opacity: 0.75,
        weight: 1,
        fillOpacity: 1,
        fillColor: colours[statusCategory[statuses[marker.category]]] || colours.unknown,
      });
      m.setOpacity = () => null;  // PruneCluster tries to call this
      return m;
    };
    this.pruneCluster.Cluster.Size = 21;
    this.props.map.addLayer(this.pruneCluster);
    this.markerIdMap = {};
  },
  componentDidMount() {
    this.updateCluster();
  },
  shouldComponentUpdate(nextProps) {
    return nextProps.waterpoints !== this.props.waterpoints;
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

    // Existing markers: remove or keep
    this.props.waterpoints.forEach(waterpoint => {
      const id = waterpoint.WATER_POINT_CODE;
      if (typeof this.markerIdMap[id] !== 'undefined') {  // already have it
        nextMap[id] = this.markerIdMap[id];  // just copy the ref over
        delete this.markerIdMap[id];  // clear ref from old map
      } else {
        const marker = new PruneCluster.Marker(...waterpoint.position);
        marker.category = statuses.indexOf(waterpoint.STATUS);
        nextMap[id] = marker;
        this.pruneCluster.RegisterMarker(marker);
      }
    });

    // remove what's left
    const toRemove = [];
    for (const id in this.markerIdMap) {
      if (this.markerIdMap.hasOwnProperty(id)) {
        toRemove.push(this.markerIdMap[id]);
      }
    }
    this.pruneCluster.RemoveMarkers(toRemove);

    // save the new map
    this.markerIdMap = nextMap;

    this.pruneCluster.ProcessView();
  },
  render() {
    return (
      <div style={{display: 'none'}}></div>
    );
  },
});

export default ClusteredWaterpoints;
