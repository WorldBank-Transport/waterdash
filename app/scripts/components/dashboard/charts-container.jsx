import React, { PropTypes } from 'react';
import T from '../utils/t';
import ViewMode from '../boilerplate/view-mode';

require('stylesheets/dashboard/charts-container');

const ChartsContainer = React.createClass({
  propTypes: {
    children: PropTypes.node.isRequired,
  },
  render() {
    return (
      <div className="charts-container">
        <div className="charts-container-header">
          <span className="tab-label">
          <T k="charts.toggle.activate" /></span>
          <ViewMode />
        </div>
        {this.props.children}
      </div>
    );
  },
});

export default ChartsContainer;
