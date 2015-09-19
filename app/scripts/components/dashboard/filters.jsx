import React from 'react';
import { connect } from 'reflux';
import { setSomeFilter } from '../../actions/filters';
import FilterStore from '../../stores/filters';
import T from '../utils/t';

require('stylesheets/dashboard/filters');

const Filters = React.createClass({
  mixins: [connect(FilterStore, 'filters')],
  render() {
    return (
      <div className="filters">
        <h2><T k="filters.title" /></h2>
        <a onClick={() => setSomeFilter(`${this.state.filters.someFilter || ''} blah`)}>clickme...</a>
        Current filters: {this.state.filters.someFilter}
      </div>
    );
  },
});

export default Filters;
