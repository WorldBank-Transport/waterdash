import React, { PropTypes } from 'react';
import T from '../misc/t';
import SubCategoryFilter from './sub-category-filter';
import { Icon } from 'react-font-awesome';

require('stylesheets/dashboard/category-filter');

const CategoryFilter = React.createClass({
  propTypes: {
    parentState: PropTypes.object.isRequired,
  },

  getInitialState() {
    return {open: false};
  },

  toggle() {
    const newState = {
      ...this.state,
      open: !this.state.open,
    };
    this.replaceState(newState);
  },

  render() {
    const [openClass, direction] = [ 'open-up', this.state.open ? 'down' : 'up' ];
    //const [openClass, direction] = this.props.parentState.match({
    //  Open: () => [ 'open-down', this.state.open ? 'up' : 'down' ],
    //  Closed: () => [ 'open-up', this.state.open ? 'down' : 'up' ],
    //});
    const visibleClass = this.state.open ? 'visible' : 'hidden';
    return (
      <div className="category-filter">
        <div className="category-filter-toggle" onClick={this.toggle}>
          <T k="charts.category.filter.title" />&nbsp;<Icon type={`chevron-circle-${direction}`}/>
        </div>
        <div className={`flyout ${openClass} ${visibleClass}`}>
          <SubCategoryFilter type="HARDWARE_PROBLEM"/>
          <SubCategoryFilter type="WATER_QUALITY"/>
          <SubCategoryFilter type="WATER_QUANTITY"/>
          <SubCategoryFilter type="SOURCE_TYPE"/>
        </div>
      </div>
    );
  },
});

export default CategoryFilter;
