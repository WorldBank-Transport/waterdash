// Utils
import { connect } from 'reflux';
import { _ } from 'results';  // catch-all for match
import AsyncState from '../../constants/async';
import ViewModes from '../../constants/view-modes';

// Stores
import DrillDownStore from '../../stores/drill-down';
import FilteredDataStore from '../../stores/filtered-data';
import LayoutStore from '../../stores/layout';
import LoadingDataStore from '../../stores/loading-data';
import LoadingPolygonsStore from '../../stores/loading-polygons';
import PolygonsDataStore, { ranges } from '../../stores/polygons-with-data';
import SelectedStore from '../../stores/selected';
import ViewStore from '../../stores/view';

// Actions
import { load } from '../../actions/data';
import { select, deselect, mapDrillDown } from '../../actions/select';
import { loadPolygons, clearPolygons } from '../../actions/polygons';
import { clear, setInclude } from '../../actions/filters';
import { toggleCharts, toggleFilters } from '../../actions/layout';

// Components
import React, { PropTypes } from 'react';
import T from '../misc/t';
import TSetChildProps from '../misc/t-set-child-props';
import MapNavPrimary from '../boilerplate/map-nav-primary';
import Share from './share';
// above map:
import MapNav from '../boilerplate/map-nav';
import DataType from '../boilerplate/data-type';
// map and overlays:
import BoundsMap from '../leaflet/bounds-map';
import { TileLayer } from 'react-leaflet';
import Filters from '../filters/filters';
import Charts from '../charts/charts';
import SpinnerModal from '../misc/spinner-modal';
import Footer from '../boilerplate/footer';
import DrillDownViewer from './drill-down-viewer';
import SearchPanel from '../filters/search-panel';
// below map
import ViewMode from '../boilerplate/view-mode';
import OverviewBar from '../charts/overview-bar';

// Styles
require('stylesheets/dashboard/dash-layout');


const DashRoot = React.createClass({

  propTypes: {
    children: PropTypes.node.isRequired,
  },

  // Hook up all the data
  mixins: [
    connect(DrillDownStore, 'drillDown'),
    connect(FilteredDataStore, 'data'),
    connect(LayoutStore, 'layout'),
    connect(LoadingDataStore, 'loadingData'),
    connect(LoadingPolygonsStore, 'loadingPolygons'),
    connect(PolygonsDataStore, 'polygonsData'),
    connect(SelectedStore, 'selected'),
    connect(ViewStore, 'view'),
  ],

  // Reset bounds and load any required data
  componentDidMount() {
    load(this.state.view.dataType);
    this.loadPolygons();
  },

  // Reload data if necessary
  componentDidUpdate(prevProps, prevState) {
    if (!this.state.view.dataType.equals(prevState.view.dataType)) {
      load(this.state.view.dataType);
    }
    if (!this.state.view.viewMode.equals(prevState.view.viewMode)) {
      this.loadPolygons();
    }
  },

  loadPolygons() {
    ViewModes.match(this.state.view.viewMode, {
      Points: () => clearPolygons(),
      [_]: () => loadPolygons(this.state.view.viewMode),
    });
  },

  // Show one loading overlay for all loading data
  renderLoadingOverlay() {
    const loading = AsyncState.match(this.state.loadingData, {
      Finished: () => ({  // data is finished but polys are still loading
        loadState: this.state.loadingPolygons,
        message: {k: `loading.${this.state.view.viewMode.toParam()}`},
        retry: this.loadPolygons,
      }),
      [_]: () => ({  // polys are still loading or failed
        loadState: this.state.loadingData,
        message: {
          k: `loading.${this.state.view.dataType.toParam()}`,
          i: [this.state.data.length],
        },
        retry: () => load(this.state.view.dataType),
      }),
    });
    return (
      <TSetChildProps>
        <SpinnerModal
            message={loading.message}
            retry={loading.retry}
            state={loading.loadState} />
      </TSetChildProps>
    );
  },

  render() {
    const propsForChildren = {
      dataType: this.state.view.dataType,
      data: this.state.data,
      viewMode: this.state.view.viewMode,
    };
    const mapChild = React.cloneElement(this.props.children, {
      ...propsForChildren,
      polygonsData: this.state.polygonsData,
      selected: this.state.selected,
      deselect,
      mapDrillDown,
      select,
      ranges: ranges(this.state.view.dataType, this.state.view.viewMode),
    });

    return (
      <div className="main dash-layout">

        <div className="dash-top">
          <MapNav primary={(
            <MapNavPrimary
                extraClasses="charts-toggle"
                onToggle={toggleCharts}
                openClosed={this.state.layout.charts}>
              <T k={`charts.toggle.${this.state.layout.charts.getId()}`} />
            </MapNavPrimary>
          )}>
            <DataType {...propsForChildren} />
            <Share />
          </MapNav>
        </div>

        <div className="map-container">
          <BoundsMap
              bounds={this.state.view.mapBounds}
              className="leaflet-map"
              dataType={this.state.view.dataType}>
            <TileLayer url="//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {mapChild}
          </BoundsMap>

          {/* Overlays that can cover the map: */}
          <Charts openClosed={this.state.layout.charts} {...propsForChildren} />
          <DrillDownViewer drillDown={this.state.drillDown}  {...propsForChildren} />
          <SearchPanel clear={clear}
              setInclude={setInclude}
              {...propsForChildren} />
          <Filters
              clear={clear}
              openClosed={this.state.layout.filters}
              {...propsForChildren} />
          {this.renderLoadingOverlay()}
        </div>

        <div className="dash-bottom">
          <MapNav primary={(
            <MapNavPrimary
                extraClasses="filters-toggle"
                onToggle={toggleFilters}
                openClosed={this.state.layout.filters}>
              <T k={`filters.toggle.${this.state.layout.filters.getId()}`} />
            </MapNavPrimary>
          )}>
            <ViewMode openClosed={this.state.layout.charts} {...propsForChildren} />
          </MapNav>
          <OverviewBar {...propsForChildren} />
        </div>
        <Footer />
      </div>
    );
  },
});

export default DashRoot;
