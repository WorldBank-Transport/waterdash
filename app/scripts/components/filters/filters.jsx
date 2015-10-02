import React from 'react';
import { connect } from 'reflux';
import FilterStore from '../../stores/filters';
import filterActions from '../../actions/filters';
import T from '../misc/t';
import Filter from './filter';
import Range from './range';

require('stylesheets/filters/filters');

const Filters = React.createClass({
  mixins: [
    connect(FilterStore, 'filters'),
  ],
  render() {
    return (
      <div className="filters">
        <div className="filters-title">
          <h2><T k="filters.title" /></h2>
        </div>
        <ul className="filters-row">
          <li>
            <Filter name="filters.population-served">
              <h4><T k="filters.population-served.unit" /></h4>
              <Range
                  defaultValue={this.state.filters.populationServed}
                  max={10000}
                  min={0}
                  onChange={filterActions.setPopulationServed} />
            </Filter>
          </li>
          <li>
            <Filter name="filters.filter-two" />
          </li>
          <li>
            <Filter name="filters.filter-three" />
          </li>
        </ul>
      </div>
    );
  },
});

export default Filters;
