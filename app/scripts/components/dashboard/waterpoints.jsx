'use strict';

import React from 'react';
import {Link} from 'react-router';
import {TileLayer} from 'react-leaflet';
import BoundsMap from '../leaflet/bounds-map.jsx';
import T from '../utils/t.jsx';
import ChartsContainer from './charts-container.jsx';

require('stylesheets/dashboard/waterpoints.scss');


const WaterPoints = React.createClass({
  render() {
    return (
      <div className="main waterpoints">
        <BoundsMap
            className="map"
            bounds={[[-.8, 29.3], [-11.8, 40.8]]}>
          <TileLayer url="//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {this.props.children}
        </BoundsMap>
        <ChartsContainer>
          charts for waterpoints...
        </ChartsContainer>
      </div>
    );
  }
});

export default WaterPoints;
