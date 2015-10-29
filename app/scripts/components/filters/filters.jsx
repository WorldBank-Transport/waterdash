import React, { PropTypes } from 'react';
import { asArray } from '../../utils/functional';

import DataTypes from '../../constants/data-types';
import FilterTypes from '../../constants/filter-types';
import OpenClosed from  '../../constants/open-closed';
import ViewModes from '../../constants/view-modes';

import filterActions from '../../actions/filters';

import T from '../misc/t';
import Range from './range';

require('stylesheets/filters/filters');

const Filters = React.createClass({
  propTypes: {
    children: PropTypes.node,
    data: PropTypes.array,  // injected
    dataType: PropTypes.instanceOf(DataTypes.OptionClass),  // injected
    openClosed: PropTypes.instanceOf(OpenClosed.OptionClass),
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),  // injected
  },
  render() {
    return OpenClosed.match(this.props.openClosed, {
      Open: () => (
        <div className="filters">
          <div className="filters-title">
            <h2><T k="filters.title" /></h2>
          </div>
          <ul className="filters-row">
            {/*asArray(this.state.filters).map(([k, f]) =>
              <li key={k}>
                <h4>Some filter...</h4>
                {FilterTypes.match(f.type, {
                  Range: (
                    <Range
                        max={10000}
                        min={0}
                        onChange={range => filterActions.setRange(k, range)} />
                  ),
                  Include: <div>include filter</div>,
                  Exclude: <div>exclude filter</div>,
                })}
              </li>
            )*/}
          </ul>
        </div>
      ),
      Closed: () => <div style={{display: 'none'}}></div>,
    });
  },
});

export default Filters;
