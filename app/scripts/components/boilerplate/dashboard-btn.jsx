import React from 'react';

require('stylesheets/boilerplate/buttons');

const DashboardBtn = React.createClass({
  render() {
    return (
      <div>
      <a className="button-link" href="/waterpoints/" >water points</a>
      </div>
    );
  },
});

export default DashboardBtn;
