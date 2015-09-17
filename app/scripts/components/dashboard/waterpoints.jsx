'use strict';

import React, {Component} from 'react';
import {Link} from 'react-router';
import {Map, TileLayer} from 'react-leaflet';
import T from '../utils/t.jsx';
import ChartsContainer from './charts-container.jsx';


export default class WaterPoints extends Component {
  render() {
    return (
      <div className="waterpoints">
        <h1><T k="dash.waterpoints" /></h1>
        <Link to="/waterpoints/some-waterpoint-id">Some waterpoint</Link>
        <Map
            style={{height: 240}}
            center={[-6.3, 35]}
            zoom={5}>
          <TileLayer url="//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </Map>
        {this.props.children}
        <ChartsContainer>
          charts for waterpoints...
        </ChartsContainer>
      </div>
    );
  }
}
