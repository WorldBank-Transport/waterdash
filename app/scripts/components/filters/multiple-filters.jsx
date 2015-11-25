import React, { PropTypes } from 'react';
import DataTypes from '../../constants/data-types';

import T from '../misc/t';
import Range from './range';

const MultipleFilters = React.createClass({
  propTypes: {
    clear: PropTypes.func.isRequired,
    dataType: PropTypes.instanceOf(DataTypes.OptionClass).isRequired,
    filterData: PropTypes.object.isRequired,
    setRange: PropTypes.func.isRequired,

  },
  componentDidUpdate(prevProps) {
    if (!this.props.dataType.equals(prevProps.dataType)) {
      this.props.clear();
    }
  },

  render() {
    const allFilters = Object.keys(this.props.filterData).map(key => {
      const filter = this.props.filterData[key];
      return (
            <div className="filter">
              <h4><T k={`filters.${key}`} /></h4>
              <Range
                  defaultValue={filter.defaultValue}
                  max={filter.max}
                  min={filter.min}
                  onChange={range => this.props.setRange(key, range)}
                  step={filter.step}/>
            </div>);
    });

    return (<div className="filterContainter">{allFilters}</div>);
  },

});

export default MultipleFilters;
