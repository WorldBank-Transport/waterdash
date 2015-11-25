import React, { PropTypes } from 'react';

import DataTypes from '../../constants/data-types';
import OpenClosed from  '../../constants/open-closed';
import ViewModes from '../../constants/view-modes';


import T from '../misc/t';
import Range from './range';
import MultipleFilters from './multiple-filters';

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
        <h4><T k="filters.population-served" /></h4>
        <Range
            defaultValue={[0, 10000]}
            max={10000}
            min={0}
            onChange={range => this.props.setRange('POPULATION SERVED', range)} />
      </div>
    );
  },
  renderBoreholes() {
    const boreholeFilters = {
      DIAMETER: {
        defaultValue: [0, 50],
        max: 50,
        min: 0,
        step: 10,
      },
      DEPTH_METER: {
        defaultValue: [6, 400],
        max: 400,
        min: 6,
        step: 50,
      },
      STATIC_WATER_LEVEL: {
        defaultValue: [0, 148.5],
        max: 148.5,
        min: 0,
        step: 20,
      },
      DYNAMIC_WATER_LEVEL_METER: {
        defaultValue: [0, 174.22],
        max: 174.22,
        min: 0,
        step: 20,
      },
      'DRAW _DOWN_METER': {
        defaultValue: [0, 120.49],
        max: 120.49,
        min: 0,
        step: 20,
      },
      YIELD_METER_CUBED_PER_HOUR: {
        defaultValue: [0.66, 104.3],
        max: 104.3,
        min: 0.66,
        step: 10,
      },
    };
    return (<MultipleFilters clear={this.props.clear} dataType={this.props.dataType} filterData={boreholeFilters} setRange={this.props.setRange}/>);
  },

  renderDams() {
    const damsFilters = {
      DAM_HEIGHT: {
        defaultValue: [0, 42.672],
        max: 42.672,
        min: 0,
        step: 10,
      },
      ELEVATION_: {
        defaultValue: [7, 2004],
        max: 2004,
        min: 7,
        step: 200,
      },
      RESERVOIR_: {
        defaultValue: [100000, 1140000000],
        max: 1140000000,
        min: 100000,
        step: 1000000,
      },
    };
    return (<MultipleFilters clear={this.props.clear} dataType={this.props.dataType} filterData={damsFilters} setRange={this.props.setRange}/>);
  },
  render() {
    return OpenClosed.match(this.props.openClosed, {
      Open: () => (
        <div className="filters">
          <div className="filters-title">
            <h3><T k="filters.title" /></h3>
          </div>
          {DataTypes.match(this.props.dataType, {
            Waterpoints: this.renderWaterpoints,
            Boreholes: this.renderBoreholes,
            Dams: this.renderDams,
          })}
        </div>
      ),
      Closed: () => <div style={{display: 'none'}}></div>,
    });
  },
});

export default Filters;
