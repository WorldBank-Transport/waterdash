import React, { PropTypes } from 'react';
import { connect } from 'reflux';
import DataTypes from '../../constants/data-types';
import OpenClosed from  '../../constants/open-closed';
import ViewModes from '../../constants/view-modes';
import T from '../misc/t';
import Range from './range';
import MultipleFilters from './multiple-filters';
import RangeStore from '../../stores/range';

require('stylesheets/filters/filters');

const Filters = React.createClass({
  propTypes: {
    clear: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
    dataType: PropTypes.instanceOf(DataTypes.OptionClass).isRequired,
    openClosed: PropTypes.instanceOf(OpenClosed.OptionClass).isRequired,
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass).isRequired,
  },
  mixins: [
    connect(RangeStore, 'ranges'),
  ],
  componentDidUpdate(prevProps) {
    if (!this.props.dataType.equals(prevProps.dataType)) {
      this.props.clear();
    }
  },
  renderWaterpoints() {
    return (
      <div className="waterpoint-filter">
        <h4><T k="filters.population-served" /></h4>
        <Range
            defaultValue={this.state.ranges['POPULATION SERVED']}
            field="POPULATION SERVED"
            max={10000}
            min={0}
            step={100}/>
      </div>
    );
  },
  renderBoreholes() {
    const boreholeFilters = {
      DIAMETER: {
        max: 50,
        min: 0,
        step: 10,
      },
      DEPTH_METER: {
        max: 400,
        min: 6,
        step: 50,
      },
      STATIC_WATER_LEVEL: {
        max: 148.5,
        min: 0,
        step: 20,
      },
      DYNAMIC_WATER_LEVEL_METER: {
        max: 174.22,
        min: 0,
        step: 20,
      },
      'DRAW _DOWN_METER': {
        max: 120.49,
        min: 0,
        step: 20,
      },
      YIELD_METER_CUBED_PER_HOUR: {
        max: 104.3,
        min: 0.66,
        step: 10,
      },
    };
    return (<MultipleFilters clear={this.props.clear} dataType={this.props.dataType} filterData={boreholeFilters} ranges={this.state.ranges}/>);
  },

  renderDams() {
    const damsFilters = {
      DAM_HEIGHT: {
        max: 42.672,
        min: 0,
        step: 10,
      },
      ELEVATION_: {
        max: 2004,
        min: 7,
        step: 200,
      },
      RESERVOIR_: {
        max: 1140000000,
        min: 100000,
        step: 1000000,
      },
    };
    return (<MultipleFilters clear={this.props.clear} dataType={this.props.dataType} filterData={damsFilters} ranges={this.state.ranges}/>);
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
