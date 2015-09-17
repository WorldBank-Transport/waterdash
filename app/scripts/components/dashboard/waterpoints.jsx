'use strict';

import React, {Component} from 'react';
import {Link} from 'react-router';
import T from '../utils/t.jsx';
import ChartsContainer from './charts-container.jsx';


export default class WaterPoints extends Component {
  render() {
    return (
      <div className="waterpoints">
        <h1><T k="dash.waterpoints" /></h1>
        <Link to="/waterpoints/some-waterpoint-id">Some waterpoint</Link>
        {this.props.children}
        <ChartsContainer>
          charts for waterpoints...
        </ChartsContainer>
      </div>
    );
  }
}
