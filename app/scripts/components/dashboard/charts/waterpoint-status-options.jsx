import React from 'react';
import IconChart from '../../boilerplate/icon-check';

require('stylesheets/dashboard/charts/waterpoint-status-options');

const WaterpointstatusOptions = React.createClass({
  render() {
    return (
      <div className="waterpoints-chart-options-container">

        <ul>
          <li className="functional"><IconChart />Functional</li>
          <li className="needrepair"><IconChart />Need repair</li>
          <li className="nonfunctional"><IconChart />Nonfuncitonal</li>
        </ul>
      </div>
    );
  },
});
export default WaterpointstatusOptions;
