import React, { PropTypes } from 'react';
import { connect } from 'reflux';
import T from '../misc/t';
import Checkbox from '../misc/checkbox';
import { setSubcategory, setAllSubcategories} from '../../actions/filters';
import * as func from '../../utils/functional';
import { Icon } from 'react-font-awesome';

require('stylesheets/dashboard/year-selector');

const YearSelector = React.createClass({
  propTypes: {
    data: PropTypes.array.isRequired,
    field: PropTypes.string.isRequired,
  },

  mixins: [
  ],

  getInitialState() {
    return {open: false, all: true, years: {}};
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
    const years = func.Result.groupBy(this.props.data, this.props.field)
    const listOfOptions = Object.keys(years).map(key => {
      const checked = this.state.years[key];
      return (<li className="year-option" key={key}><Checkbox action={e => this.select(e, this.props.field, key)} checked={checked} label={`charts.years.${key}`} /></li>);
    });
    const [openClass, direction] = [ 'open-up', this.state.open ? 'down' : 'up' ];
    const visibleClass = this.state.open ? 'visible' : 'hidden';
    return (
      <div className="year-selector">
        <div className="year-selector-toggle" onClick={this.toggle}>
          <T k="charts.years.filter.title" />&nbsp;<Icon type={`chevron-circle-${direction}`}/>
        </div>
        <div className={`flyout ${openClass} ${visibleClass}`}>
          <ul className={visibleClass}>
            <li className="year-option" key="all"><Checkbox action={this.selectAll} checked={this.state.all} label="charts.years.all" /></li>
            {listOfOptions}
          </ul>
        </div>
      </div>);
  },
});

export default YearSelector;
