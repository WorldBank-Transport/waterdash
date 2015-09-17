'use strict';

import React, {Component} from 'react';
import {RouteHandler} from 'react-router';
import {Map, TileLayer} from 'react-leaflet';

export default class Main extends Component {
  render() {
    console.log('main children', this.props.children);
    return (
      <div className="dashboard">
        <Map style={{height: 300}} maxBounds={[[-.8, 29.3], [-11.8, 40.8]]}>
          <TileLayer url="//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </Map>
        {this.props.children}
      </div>
    );
  }
}
