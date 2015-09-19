import React from 'react';
import T from '../utils/t';

require('stylesheets/dashboard/filters');

const Filters = React.createClass({
  render() {
    return (
      <div className="filters">
        <h2><T k="filters.title" /></h2>
      </div>
    );
  },
});

export default Filters;
