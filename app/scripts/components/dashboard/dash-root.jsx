// Utils
import { connect } from 'reflux';
import { _ } from 'results';  // catch-all for match
import ViewModes from '../../constants/view-modes';
import tzBounds from '../../constants/tz-bounds';

// Stores
import FilteredDataStore from '../../stores/filtered-data';
import LayoutStore from '../../stores/layout';
import LoadingDataStore from '../../stores/loading-data';
import LoadingPolygonsStore from '../../stores/loading-polygons';
import PolygonsDataStore from '../../stores/polygons-with-data';
import SelectedStore from '../../stores/selected';
import ViewStore from '../../stores/view';

// Actions
import { load } from '../../actions/data';
import select from '../../actions/select';
import { setMapBounds } from '../../actions/view';
import { loadPolygons, clearPolygons } from '../../actions/polygons';
import { clear, setRange, setInclude } from '../../actions/filters';
import { toggleCharts, toggleFilters } from '../../actions/layout';

// Components
import React, { PropTypes } from 'react';
import T from '../misc/t';
import TSetChildProps from '../misc/t-set-child-props';
import MapNavPrimary from '../boilerplate/map-nav-primary';
// above map:
import MapNav from '../boilerplate/map-nav';
import DataType from '../boilerplate/data-type';
// map and overlays:
import BoundsMap from '../leaflet/bounds-map';
import { TileLayer } from 'react-leaflet';
import Filters from '../filters/filters';
import Charts from '../charts/charts';
import SpinnerModal from '../misc/spinner-modal';
// below map
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
    connect(LoadingPolygonsStore, 'loadingPolygons'),
    connect(PolygonsDataStore, 'polygonsData'),
    connect(SelectedStore, 'selected'),
    connect(ViewStore, 'view'),
  ],
  componentDidMount() {
    setMapBounds(tzBounds);  // reset bounds (eg. if we went to a static page and came back)
    load(this.state.view.dataType);
    this.updatePolygons();
  },
  componentDidUpdate(prevProps, prevState) {
    if (!this.state.view.dataType.equals(prevState.view.dataType)) {
      load(this.state.view.dataType);
    }
    if (!this.state.view.viewMode.equals(prevState.view.viewMode)) {
      this.updatePolygons();
    }
  },
  updatePolygons() {
    ViewModes.match(this.state.view.viewMode, {
      Points: () => clearPolygons(),
      [_]: () => loadPolygons(this.state.view.viewMode),
    });
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
      select: select,
      selected: this.state.selected,
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
          </MapNav>
        </div>

        <div className="map-container">
          <BoundsMap
              bounds={this.state.view.mapBounds}
              className="leaflet-map">
            <TileLayer url="//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {mapChild}
          </BoundsMap>

          {/* Overlays that can cover the map: */}
          <Charts openClosed={this.state.layout.charts} {...propsForChildren} />
          <Filters
              clear={clear}
              openClosed={this.state.layout.filters}
              setInclude={setInclude}
              setRange={setRange}
              {...propsForChildren} />
          {/* Polygons loading overlay */}
          <TSetChildProps>
            <SpinnerModal
                message={{k: `loading.${this.state.view.viewMode.toParam()}`}}
                retry={this.updatePolygons}
                state={this.state.loadingPolygons} />
          </TSetChildProps>
          {/* Data loading overlay */}
          <TSetChildProps>
            <SpinnerModal
                message={{k: `loading.${this.state.view.dataType.toParam()}`,
                  i: [this.state.data.length]}}
                retry={() => load(this.state.view.dataType)}
                state={this.state.loadingData} />
          </TSetChildProps>
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
            <ViewMode {...propsForChildren} />
          </MapNav>
          <OverviewBar {...propsForChildren} />
        </div>

      </div>
    );
  },
});

export default DashRoot;
