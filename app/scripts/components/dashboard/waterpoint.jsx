'use strict';

import React from 'react';
import T from '../utils/t.jsx';
import WaterPoints from './waterpoints.jsx';

const WaterPoint = React.createClass({
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
});

export default WaterPoint;
