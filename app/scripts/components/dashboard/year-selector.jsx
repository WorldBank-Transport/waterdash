import React, { PropTypes } from 'react';
import { connect } from 'reflux';
import T from '../misc/t';
import Checkbox from '../misc/checkbox';
import { selectYear, selectAllYears} from '../../actions/filters';
import { Icon } from 'react-font-awesome';
import OpenClosed from '../../constants/open-closed';
import YearStore from '../../stores/year';

require('stylesheets/dashboard/year-selector');

const YearSelector = React.createClass({
  propTypes: {
    parentState: PropTypes.instanceOf(OpenClosed.OptionClass),
  },

  mixins: [
    connect(YearStore, 'years'),
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

  select(e, year) {
    e.preventDefault();
    selectYear(year);
  },

  selectAll(e) {
    e.preventDefault();
    const newState = {
      ...this.state,
      all: !this.state.all,
    };
    selectAllYears(!this.state.all);
    this.replaceState(newState);
  },

  render() {
    const listOfOptions = Object.keys(this.state.years).map(key => {
      const checked = this.state.years[key];
      return (<li className="year-option" key={key}><Checkbox action={e => this.select(e, key)} checked={checked} label={`charts.years.${key}`} /></li>);
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
