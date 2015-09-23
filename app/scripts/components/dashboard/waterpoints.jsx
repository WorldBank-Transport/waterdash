import React, { PropTypes } from 'react';
import {TileLayer} from 'react-leaflet';
import BoundsMap from '../leaflet/bounds-map';
import ChartsContainer from './charts-container';
import MetricStatus from './charts/metric-status';

require('stylesheets/dashboard/waterpoints');


const WaterPoints = React.createClass({
  propTypes: {
    children: PropTypes.node,
  },
  render() {
    return (
      <div className="main waterpoints">
        <BoundsMap
            bounds={[[-0.8, 29.3], [-11.8, 40.8]]}
            className="map">
          <TileLayer url="//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {this.props.children}
        </BoundsMap>
        <ChartsContainer>
          charts for waterpoints...
          <MetricStatus metric="54.65" title="chart.title.functional" total="123456"/>
          <MetricStatus metric="54.65" title="chart.title.functional" total="123456"/>
          <MetricStatus metric="54.65" title="chart.title.functional" total="123456"/>
        </ChartsContainer>
      </div>
    );
  },
});

export default WaterPoints;
