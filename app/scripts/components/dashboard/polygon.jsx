'use strict';

import React, {Component} from 'react';

export default class Polygon extends Component {
  render() {
    return (
      <h1>
        Polygon
        {' '}
        <small>({this.props.params.id})</small>
      </h1>
    );
  }
}
