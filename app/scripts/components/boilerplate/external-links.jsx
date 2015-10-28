import React from 'react';

require('stylesheets/boilerplate/static-content');

const DataSources = React.createClass({
  render() {
    return (
      <div className="data-sources">
        <ul>
          <li>
            <a href="http://www.nbs.go.tz/"><img src="images/tz-odp.png"/>
              Government Open Data Portal
            </a>
          </li>
          <li>
            <a href="http://www.maji.go.tz/"><img src="images/water-ministry.png"/>
            Ministry of Water
            </a>
          </li>
          <li>
            <a href="http://www.nbs.go.tz/"><img src="images/nbs.png"/>
              National Bureau of Statistics
            </a>
          </li>
        </ul>
      </div>
    );
  },
});
export default DataSources;
