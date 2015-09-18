'use strict';

import React from 'react';
import T from '../utils/t.jsx';
import ViewMode from '../boilerplate/view-mode.jsx';

require('stylesheets/dashboard/charts-container.scss');

const ChartsContainer = React.createClass({
  render() {
    return (
      <div className="charts-container">
        <div className="charts-container-header">
          <T k="charts.toggle.activate" />
          <ViewMode />
        </div>
        {this.props.children}
      </div>
    );
  }
});

export default ChartsContainer;
