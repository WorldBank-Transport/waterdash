'use strict';

import React, {Component} from 'react';
import T from '../utils/t.jsx';

require('stylesheets/dashboard/filters.scss');

export default class Filters extends Component {
  render() {
    return (
      <div className="filters">
        <h2><T k="filters.title" /></h2>
      </div>
    );
  }
}
