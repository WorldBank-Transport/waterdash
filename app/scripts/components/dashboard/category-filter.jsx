import React from 'react';
import { connect } from 'reflux';
import T from '../misc/t';
import SubCategoryFilter from './sub-category-filter';
import { Icon } from 'react-font-awesome';
import OpenClosed from '../../constants/open-closed';
import { toggleCategories } from '../../actions/layout';
import LayoutStore from '../../stores/layout';

require('stylesheets/dashboard/category-filter');

const CategoryFilter = React.createClass({

  mixins: [
    connect(LayoutStore, 'layout'),
  ],

  render() {
    const [openClass, direction, visibleClass] = OpenClosed.match(this.state.layout.categories, {
      Open: () => [ 'open-up', 'down', 'visible' ],
      Closed: () => [ 'open-up', 'up', 'hidden' ],
    });
    return (
      <div className="category-filter">
        <div className="category-filter-toggle" onClick={toggleCategories}>
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
