import React, { PropTypes } from 'react';
import { connect } from 'reflux';
import T from '../misc/t';
import CategoriesStore from '../../stores/categories';
import { setSubcategory } from '../../actions/filters';
import { Icon } from 'react-font-awesome';

//require('stylesheets/dashboard/category-filter');

const SubCategoryFilter = React.createClass({
  propTypes: {
    type: PropTypes.string.isRequired,
  },

  mixins: [
    connect(CategoriesStore, 'categories'),
  ],

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

  select(e, metric, value) {
    e.preventDefault();
    setSubcategory(metric, value);
  },

  render() {
    if (!this.state.categories[this.props.type]) {
      return false;
    }
    const listOfOptions = Object.keys(this.state.categories[this.props.type]).map(key => {
      const checked = this.state.categories[this.props.type][key] ? 'checked' : '';
      return (<li><input checked={checked} onChange={e => this.select(e, this.props.type, key)} type="checkbox"/> <T k={`charts.sub-category.value.${key}`} /></li>);
    });
    const visibleClass = this.state.open ? 'visible' : 'hidden';
    const direction = this.state.open ? 'up' : 'down';
    return (
      <div className="sub-category-filter">
        <div onClick={this.toggle}>
          <T k={`charts.sub-category.${this.props.type}`} />&nbsp;<Icon type={`angle-double-${direction}`}/>
        </div>
        <ul className={visibleClass}>
          {listOfOptions}
        </ul>
      </div>
    );
  },
});

export default SubCategoryFilter;