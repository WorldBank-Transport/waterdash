import React from 'react';
import Divider from '../boilerplate/divider';
import T from '../misc/t';

require('stylesheets/boilerplate/static-content');

const Data = React.createClass({
  render() {
    return (
      <div className="main">
        <Divider />
        <div className="static-content">
        <h2><T k="static.data-title" /></h2>
        <p><T k="static.data-content" /></p>
          <ul className="data-sources">
            <li><a href="http://www.nbs.go.tz/"><img src="images/tz-odp.png"/></a></li>
            <li><a href="http://www.maji.go.tz/"><img src="images/water-ministry.png"/></a></li>
            <li><a href="http://www.nbs.go.tz/"><img src="images/nbs.png"/></a></li>
          </ul>
        </div>
      </div>
    );
  },
});

export default Data;
