import React, { PropTypes } from 'react';
import T from '../misc/t';
import TSetChildProps from '../misc/t-set-child-props';
import DataTypes from '../../constants/data-types';
import ViewModes from '../../constants/view-modes';
import Autocomplete from 'react-autocomplete';
import { getSearchField, getSearchItems, styles } from '../../utils/searchUtil';
import { Icon } from 'react-font-awesome';

require('stylesheets/filters/search-panel');
require('stylesheets/boilerplate/button');

const SearchPanel = React.createClass({
  propTypes: {
    data: PropTypes.array,  // injected
    dataType: PropTypes.instanceOf(DataTypes.OptionClass),  // injected
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),  // injected
    clear: PropTypes.func,
    setInclude: PropTypes.func,
  },
  getInitialState() {
    return {
      open: false,
      filters: {},
    }
  },
  close() {
    this.props.clear();
    this.replaceState({
      ...this.state,
      open: false,
      filters: {},
    });
  },
  toggle(e) {
    e.preventDefault();
    this.replaceState({
      ...this.state,
      open: !this.state.open,
    });
  },
  matchStateToTerm(key) {
    return (state, value) => {
      return value.length > 2 && (
        state[key].toLowerCase().indexOf(value.toLowerCase()) !== -1
      );
    }
  },
  sortStates(key) {
    return (a, b, value) => {
      return (
        a[key].toLowerCase().indexOf(value.toLowerCase()) >
        b[key].toLowerCase().indexOf(value.toLowerCase()) ? 1 : -1
      );
    }
  },
  search() {
    const filters = Object.keys(this.state.filters);
    if(filters.length > 0) {
      filters.forEach(key => {
        this.props.setInclude(key, [this.state.filters[key]]); // TODO validate filters
      });
    }
  },
  renderSearchFields() {
    const allField = getSearchField(this.props.dataType);
    return allField.map(key => {
      return (<div className="search-field">
        <T k={`search.field.${key}`} />
        <Autocomplete
            items={getSearchItems(this.props.data, key)}
            getItemValue={(item) => item[key]}
            shouldItemRender={this.matchStateToTerm(key)}
            sortItems={this.sortStates(key)}
            renderItem={(item, isHighlighted) => (
              <div
                style={isHighlighted ? styles.highlightedItem : styles.item}
                key={item[key]}
              >{item[key]}</div>
            )}
            onSelect={(value, item) => {
              const newState = {
                ...this.state,
                filters: {
                  ...this.state.filters,
                  [key]: item[key],
                },
              };
              this.replaceState(newState);
            }}
          />
      </div>)
    });
  },

  render() {
    let allField = getSearchField(this.props.dataType);
    if (this.state.open) {
      return (
        <div className="search-panel">
          <TSetChildProps>
            <div
              className="close-button"
              onClick={this.close}
              title={{k: 'popup.close'}}>
              &times;
            </div>
          </TSetChildProps>
          {this.renderSearchFields()}
          <div className="button" onClick={this.search}>
            <T k="search.button" />
          </div>
        </div>
      );
    } else {
      return (<Icon className="search-icon" onClick={this.toggle} type="search-plus"/>);
    }
  },
});

export default SearchPanel;

    