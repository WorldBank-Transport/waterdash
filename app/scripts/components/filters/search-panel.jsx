import React, { PropTypes } from 'react';
import T from '../misc/t';
import DataTypes from '../../constants/data-types';
import ViewModes from '../../constants/view-modes';
import Autocomplete from 'react-autocomplete';
import { getSearchField } from '../../utils/searchUtil';

require('stylesheets/filters/search-panel');

const styles = {
  item: {
    padding: '2px 6px',
    cursor: 'default'
  },

  highlightedItem: {
    color: 'white',
    background: 'hsl(200, 50%, 50%)',
    padding: '2px 6px',
    cursor: 'default'
  },

  menu: {
    border: 'solid 1px #ccc'
  }
};

const SearchPanel = React.createClass({
  propTypes: {
    data: PropTypes.array,  // injected
    dataType: PropTypes.instanceOf(DataTypes.OptionClass),  // injected
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),  // injected
  },
  getInitialState() {
    return {
      open: false,
    }
  },
  toggle(e) {
    e.preventDefault();
    this.replaceState({open: !this.state.open});
  },
  getStates() {
    return this.props.data;
  },
  matchStateToTerm(state, value) {
    return value.length > 3 && (
      state.WATER_POINT_CODE.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
  },
  sortStates(a, b, value) {
    return (
      a.WATER_POINT_NAME.toLowerCase().indexOf(value.toLowerCase()) >
      b.WATER_POINT_NAME.toLowerCase().indexOf(value.toLowerCase()) ? 1 : -1
    );
  },
  render() {
    let allField = getSearchField(this.props.dataType);
    return (
      <div className="search-panel">
        search
        <Autocomplete
          items={this.props.data}
          getItemValue={(item) => item.WATER_POINT_NAME}
          shouldItemRender={this.matchStateToTerm}
          sortItems={this.sortStates}
          renderItem={(item, isHighlighted) => (
            <div
              style={isHighlighted ? styles.highlightedItem : styles.item}
              key={item.WATER_POINT_CODE}
            >{item.WATER_POINT_NAME}</div>
          )}
        />
      </div>
    );
  },
});

export default SearchPanel;

    