import React from 'react';
import T from '../misc/t';

require('stylesheets/boilerplate/open-data-nav');

const OpenDataNav = React.createClass({
  render() {
    return (
      <ul className="open-data-nav">
        <li>
          <a href="http://opendata.go.tz">
            <T k="data.external.govopendataportal" />
          </a>
        </li>
        <li>
          <a href="http://education.opendata.go.tz" target="_blank">
            <T k="nav.edudash" />
          </a>
        </li>
        <li>
        <a href="http://health.opendata.go.tz" target="_blank">
          <T k="nav.healthdash" />
        </a>
        </li>
      </ul>
    );
  },
});

export default OpenDataNav;
