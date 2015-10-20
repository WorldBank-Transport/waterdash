import React from 'react';
import {Link} from 'react-router';
import T from '../misc/t';

require('stylesheets/boilerplate/view-mode');

const ViewMode = React.createClass({
  render() {
    return (
      <div className="view-mode">
        <ul>
          <li>
            <Link activeClassName="active" to="/">
              <T k="view-mode.points" />
            </Link>
          </li>
          <li>
            <Link activeClassName="active" to="/region/" query={{drilldownField: 'REGION'}}>
              <T k="view-mode.region" />
            </Link>
          </li>
          <li>
            <Link activeClassName="active" to="/district/" query={{drilldownField: 'DISTRICT', field: 'REGION', id: 'ARUSHA'}}>
              <T k="view-mode.district" />
            </Link>
          </li>
          <li>
            <Link activeClassName="active" to="/ward/">
              <T k="view-mode.ward" />
            </Link>
          </li>
        </ul>
      </div>
    );
  },
});

export default ViewMode;
