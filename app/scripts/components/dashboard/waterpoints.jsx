import React, { PropTypes } from 'react';
import { connect } from 'reflux';
import { load } from '../../actions/waterpoints';
import WaterPointsStore from '../../stores/waterpoints';
import PolygonsStore from '../../stores/polygon';
import { TileLayer, Polygon } from 'react-leaflet';
import BoundsMap from '../leaflet/bounds-map';
import WaterpointMarker from '../leaflet/waterpoint-marker';
import ChartsContainer from './charts-container';
import { loadRegions, loadDistricts } from '../../actions/polygon'

require('stylesheets/dashboard/waterpoints');


const WaterPoints = React.createClass({
  propTypes: {
    children: PropTypes.node,
  },
  mixins: [
    connect(WaterPointsStore, 'waterpoints'),
    connect(PolygonsStore, 'polygons'),
  ],
  componentDidMount() {
    load();
    loadRegions();
    //loadDistricts();
  },
  render() {
    return (
      <div className="main waterpoints">
        <BoundsMap
            bounds={[[-0.8, 29.3], [-11.8, 40.8]]}
            className="map">
          <TileLayer url="//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {this.state.waterpoints.map(waterpoint =>
            <WaterpointMarker key={waterpoint.WATER_POINT_CODE} {...waterpoint} />
          )}
        </BoundsMap>
        <ChartsContainer>
          There are {this.state.waterpoints.length} waterpoints loaded
          <br/>
        </ChartsContainer>
      </div>
    );
  },
});

export default WaterPoints;
