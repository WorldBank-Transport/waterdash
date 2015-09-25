import React from 'react';
import {Link} from 'react-router';
import T from '../misc/t';

require('stylesheets/boilerplate/view-mode');

const ViewMode = React.createClass({
  render() {
    return (
      <ul className="view-mode">
        <li>
          <Link activeClassName="active" to="/">
            <T k="view-mode.points" />
          </Link>
        </li>
        <li>
          <Link activeClassName="active" to="/region/">
            <T k="view-mode.region" />
          </Link>
        </li>
        <li>
          <Link activeClassName="active" to="/district/">
            <T k="view-mode.district" />
          </Link>
        </li>
        <li>
          <Link activeClassName="active" to="/ward/">
            <T k="view-mode.ward" />
          </Link>
        </li>
      </ul>
    );
  },
});

export default ViewMode;
