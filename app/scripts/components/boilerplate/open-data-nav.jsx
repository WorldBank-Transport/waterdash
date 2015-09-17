'use strict';

import React, {Component} from 'react';
import {Link} from 'react-router';
import T from '../utils/t.jsx';

require('stylesheets/boilerplate/open-data-nav.scss');

export default class OpenDataNav extends Component {
  render() {
    return (
      <ul className="open-data-nav">
        <li>
          <Link to="/" activeClassName="active">
            <T k="nav.home" />
          </Link>
        </li>
        <li>
          <Link to="/data/" activeClassName="active">
            <T k="nav.data" />
          </Link>
        </li>
        <li>
          <Link to="/speak-out/" activeClassName="active">
            <T k="nav.speak-out" />
          </Link>
        </li>
      </ul>
    );
  }
}
