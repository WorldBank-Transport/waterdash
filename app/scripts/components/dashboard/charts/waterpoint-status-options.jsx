import React from 'react';
require('stylesheets/dashboard/charts/waterpoint-status-options');

const WaterpointstatusOptions = React.createClass({
  render() {
    return (
      <div className="waterpoints-chart-options-container">
        <ul>
          <li className="functional">Functional</li>
          <li className="needrepair">Need repair</li>
          <li className="nonfunctional">Nonfuncitonal</li>
        </ul>
      </div>
    );
  },
});
export default WaterpointstatusOptions;
