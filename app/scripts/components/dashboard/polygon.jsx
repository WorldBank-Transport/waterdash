'use strict';

import React from 'react';

const Polygon = React.createClass({
  render() {
    return (
      <h1>
        Polygon
        {' '}
        <small>({this.props.params.id})</small>
      </h1>
    );
  }
});

export default Polygon;
