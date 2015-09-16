'use strict';

import React from 'react';
import {RouteHandler} from 'react-router';
import {Map, TileLayer} from 'react-leaflet'

export default class Root extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello world</h1>
        <Map style={{height: 300}} center={[45.43, -75.71]} zoom={12} >
          <TileLayer url='http://{s}.tile.osm.org/{z}/{x}/{y}.png' />
        </Map>
      </div>
    )
  }
}
