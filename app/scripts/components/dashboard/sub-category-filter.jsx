import React, { PropTypes } from 'react';
import { connect } from 'reflux';
import T from '../misc/t';
import Checkbox from '../misc/checkbox';
import CategoriesStore from '../../stores/categories';
import { setSubcategory, setAllSubcategories} from '../../actions/filters';
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
    return {open: false, all: true};
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

  selectAll(e) {
    e.preventDefault();
    const newState = {
      ...this.state,
      all: !this.state.all,
    };
    setAllSubcategories(this.props.type, !this.state.all);
    this.replaceState(newState);
  },

  render() {
    if (!this.state.categories[this.props.type]) {
      return false;
    }
    const listOfOptions = Object.keys(this.state.categories[this.props.type]).map(key => {
      const checked = this.state.categories[this.props.type][key];
      return (<li key={key}><Checkbox action={e => this.select(e, this.props.type, key)} checked={checked} label={`charts.sub-category.value.${key}`} /></li>);
    });
    const visibleClass = this.state.open ? 'visible' : 'hidden';
    const direction = this.state.open ? 'up' : 'down';
    return (
      <div className="sub-category-filter">
        <div className="category-collapsable" onClick={this.toggle}>
          <T k={`charts.sub-category.${this.props.type}`} />&nbsp;<Icon type={`chevron-${direction}`}/>
        </div>
        <ul className={visibleClass}>
          <li><Checkbox action={this.selectAll} checked={this.state.all} label="charts.sub-category.all" /></li>
          {listOfOptions}
        </ul>
      </div>
    );
  },
});

export default SubCategoryFilter;
