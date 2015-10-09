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
  },
  componentDidMount() {
    this.updatePC();
  },
  shouldComponentUpdate(nextProps) {
    return nextProps.data !== this.props.data;
  },
  componentDidUpdate() {
    this.updatePC();
  },
  componentWillUnmount() {
    this.props.map.removeLayer(this.pruneCluster);
  },
  updatePC() {
    this.pruneCluster.RemoveMarkers();
    this.props.data.forEach(waterpoint => {
      const marker = new PruneCluster.Marker(...waterpoint.position);
      this.pruneCluster.RegisterMarker(marker);
    });
    this.pruneCluster.ProcessView();
  },
  render() {
    return (
      <div style={{display: 'none'}}></div>
    );
  },
});

export default ClusteredWaterpoints;
