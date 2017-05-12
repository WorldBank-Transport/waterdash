import React from 'react';
import {Link} from 'react-router';
import T from '../misc/t';

require('stylesheets/boilerplate/open-data-nav');

const OpenDataNav = React.createClass({
  render() {
    return (
      <ul className="open-data-nav">
        <li>
          <Link activeClassName="active" to="/">
            <T k="nav.home" />
          </Link>
        </li>
        <li>
          <Link activeClassName="active" to="/data/">
            <T k="nav.data" />
          </Link>
        </li>
        <li>
           <a href="http://suggest.opendata.go.tz/feedback/" target="_blank">
            <T k="nav.speak-out" />
          </a>
        </li>
      </ul>
    );
  },
});

export default OpenDataNav;
