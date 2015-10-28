import React from 'react';
import T from '../misc/t';

require('stylesheets/boilerplate/overview-bar');

const OverviewBar = React.createClass({
  render() {
    return (
      <div className="overview-bar">
        <T k="overview-bar" />
      </div>
    );
  },
});

export default OverviewBar;
