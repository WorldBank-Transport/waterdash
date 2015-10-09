import { Map } from 'leaflet';
import { PruneCluster, PruneClusterForLeaflet } from './prune-cluster';
import React, { PropTypes } from 'react';

const ClusteredWaterpoints = React.createClass({
  propTypes: {
    data: PropTypes.array.isRequired,
    map: PropTypes.instanceOf(Map).isRequired,
  },
  componentWillMount() {
    this.pruneCluster = new PruneClusterForLeaflet();
    this.pruneCluster.Cluster.Size = 21;
    this.props.map.addLayer(this.pruneCluster);
    this.markerIdMap = {};
  },
  componentDidMount() {
    this.updateCluster();
  },
  shouldComponentUpdate(nextProps) {
    return nextProps.data !== this.props.data;
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
    this.props.data.forEach(waterpoint => {
      const id = waterpoint.WATER_POINT_CODE;
      if (typeof this.markerIdMap[id] !== 'undefined') {  // already have it
        nextMap[id] = this.markerIdMap[id];  // just copy the ref over
        delete this.markerIdMap[id];  // clear ref from old map
      } else {
        const marker = new PruneCluster.Marker(...waterpoint.position);
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
