import React, { PropTypes } from 'react';
import { _ } from 'results';  // catch-all for match

import DataTypes from '../../constants/data-types';
import OpenClosed from  '../../constants/open-closed';
import ViewModes from '../../constants/view-modes';


import T from '../misc/t';
import Range from './range';

require('stylesheets/filters/filters');

const Filters = React.createClass({
  propTypes: {
    clear: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
    dataType: PropTypes.instanceOf(DataTypes.OptionClass).isRequired,
    openClosed: PropTypes.instanceOf(OpenClosed.OptionClass).isRequired,
    setInclude: PropTypes.func.isRequired,
    setRange: PropTypes.func.isRequired,
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass).isRequired,
  },
  componentDidUpdate(prevProps) {
    if (!this.props.dataType.equals(prevProps.dataType)) {
      this.props.clear();
    }
  },
  renderWaterpoints() {
    return (
      <div>
        <h4>pop served</h4>
        <Range
            defaultValue={[0, 10000]}
            max={10000}
            min={0}
            onChange={range => this.props.setRange('POPULATION SERVED', range)} />
      </div>
    );
  },
  renderOthers() {
    return (
      <div>
        other filters...
      </div>
    );
  },
  render() {
    return OpenClosed.match(this.props.openClosed, {
      Open: () => (
        <div className="filters">
          <div className="filters-title">
            <h2><T k="filters.title" /></h2>
          </div>
          {DataTypes.match(this.props.dataType, {
            Waterpoints: this.renderWaterpoints,
            [_]: this.renderOthers,
          })}
        </div>
      ),
      Closed: () => <div style={{display: 'none'}}></div>,
    });
  },
});

export default Filters;
