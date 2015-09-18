'use strict';

import React from 'react';
import {Link} from 'react-router';
import T from '../utils/t.jsx';

require('stylesheets/boilerplate/view-mode.scss');

const ViewMode = React.createClass({
  render() {
    return (
      <ul className="view-mode">
        <li>
          <Link to="/" activeClassName="active">
            <T k="view-mode.points" />
          </Link>
        </li>
        <li>
          <Link to="/region/" activeClassName="active">
            <T k="view-mode.region" />
          </Link>
        </li>
        <li>
          <Link to="/district/" activeClassName="active">
            <T k="view-mode.district" />
          </Link>
        </li>
        <li>
          <Link to="/ward/" activeClassName="active">
            <T k="view-mode.ward" />
          </Link>
        </li>
      </ul>
    );
  }
});

export default ViewMode;
