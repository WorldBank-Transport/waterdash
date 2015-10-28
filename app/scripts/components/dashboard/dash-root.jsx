import { connect } from 'reflux';

// Stores
import FilteredDataStore from '../../stores/filtered-data';
import LayoutStore from '../../stores/layout';
import LoadingDataStore from '../../stores/loading-data';
import ViewStore from '../../stores/view';

// Actions
import { load } from '../../actions/data';
import { toggleCharts, toggleFilters } from '../../actions/layout';

// Components
import React, { PropTypes } from 'react';
import TSetChildProps from '../misc/t-set-child-props';
// above map:
import MapNav from '../boilerplate/map-nav';
import ChartsToggle from '../boilerplate/charts-toggle';
import DataType from '../boilerplate/data-type';
// map and overlays:
import Filters from '../filters/filters';
import Charts from '../charts/charts';
import SpinnerModal from '../misc/spinner-modal';
// below map
import FiltersToggle from '../boilerplate/filters-toggle';
import ViewMode from '../boilerplate/view-mode';
import OverviewBar from '../charts/overview-bar';

// Styles
require('stylesheets/dashboard/dash-layout');


const DashRoot = React.createClass({
  propTypes: {
    children: PropTypes.node.isRequired,
  },
  mixins: [
    connect(FilteredDataStore, 'data'),
    connect(LayoutStore, 'layout'),
    connect(LoadingDataStore, 'loadingData'),
    connect(ViewStore, 'view'),
  ],
  componentDidMount() {
    load(this.state.view.dataType);
  },
  render() {
    const propsForChildren = {
      dataType: this.state.view.dataType,
      data: this.state.data,
      viewMode: this.state.view.viewMode,
    };
    const mapChild = React.cloneElement(this.props.children, propsForChildren);

    return (
      <div className="main dash-layout">

        <div className="dash-top">
          <MapNav primary={<ChartsToggle onToggle={toggleCharts} openClosed={this.state.layout.charts} />}>
            <DataType {...propsForChildren} />
          </MapNav>
        </div>

        <div className="map-container">
          {mapChild}

          {/* Overlays that can cover the map: */}
          <Charts openClosed={this.state.layout.charts} {...propsForChildren} />
          <Filters openClosed={this.state.layout.filters} {...propsForChildren} />
          <TSetChildProps>
            <SpinnerModal
                message={{k: `loading.${this.state.view.dataType.toParam()}`,
                  i: [this.state.data.length]}}
                retry={() => load(this.state.view.dataType)}
                state={this.state.loadingData} />
          </TSetChildProps>
        </div>

        <div className="dash-bottom">
          <MapNav primary={<FiltersToggle onToggle={toggleFilters} openClosed={this.state.layout.filters} />}>
            <ViewMode {...propsForChildren} />
          </MapNav>
          <OverviewBar {...propsForChildren} />
        </div>

      </div>
    );
  },
});

export default DashRoot;
