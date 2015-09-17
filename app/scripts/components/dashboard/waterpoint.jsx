'use strict';

import React, {Component} from 'react';
import T from '../utils/t.jsx';
import WaterPoints from './waterpoints.jsx';

export default class WaterPoint extends Component {
  render() {
    return (
      <WaterPoints>
        <h1>
          <T k="dash.waterpoint" />
          {' '}
          <small>{this.props.params.id}</small>
        </h1>
      </WaterPoints>
    );
  }
}
