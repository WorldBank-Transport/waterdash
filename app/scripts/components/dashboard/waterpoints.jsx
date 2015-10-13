import React, { PropTypes } from 'react';
import { connect } from 'reflux';
import { load } from '../../actions/waterpoints';
import { load as loadBoreholes } from '../../actions/boreholes';
import { toggleCharts } from '../../actions/layout';
import LayoutStore from '../../stores/layout';
import FilteredWaterpointsStore from '../../stores/filtered-waterpoints';
import WaterpointsStateStore from '../../stores/waterpoints-state';
import BoreholesStore from '../../stores/boreholes';
import { TileLayer } from 'react-leaflet';
import BoundsMap from '../leaflet/bounds-map';
import WaterpointMarker from '../leaflet/waterpoint-marker';
import ChartsContainer from './charts-container';
import SpinnerModal from '../misc/spinner-modal';
import WaterpointStatusChart from './charts/waterpoint-status-chart';
import WaterpointFunctionalChart from './charts/waterpoint-functional-chart';
import BoreholesStatsChart from './charts/boreholes-stats-chart';
import Filters from '../filters/filters';

require('stylesheets/dashboard/waterpoints');


const WaterPoints = React.createClass({
  propTypes: {
    children: PropTypes.node,
  },
  mixins: [
    connect(FilteredWaterpointsStore, 'waterpoints'),
    connect(WaterpointsStateStore, 'waterpointsState'),
    connect(BoreholesStore, 'boreholes'),
    connect(LayoutStore, 'layout'),
  ],
  componentDidMount() {
    load();
    loadBoreholes();
  },
  render() {
    return (
      <div className="main">
        <Filters />
        <div className="waterpoints">
          <div className="map-container">
            <BoundsMap
                bounds={[[-0.8, 29.3], [-11.8, 40.8]]}
                className="leaflet-map">
                <TileLayer url="//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {this.state.waterpoints.map(waterpoint =>
              <WaterpointMarker center={waterpoint.position} key={waterpoint.WATER_POINT_CODE} />
            )}
            </BoundsMap>
            <SpinnerModal
                retry={load}
                state={this.state.waterpointsState} />
          </div>
          <ChartsContainer
              onToggle={toggleCharts}
              state={this.state.layout.charts}
              waterpoints={this.state.waterpoints}>
            <div className="container">
              <div className="secondaryCharts">
                <div className="row"><WaterpointFunctionalChart waterpoints={this.state.waterpoints}/></div>
                <div className="row"><BoreholesStatsChart boreholes={this.state.boreholes}/></div>
              </div>
              <div className="mainChart">
                <WaterpointStatusChart waterpoints={this.state.waterpoints} />
              </div>
            </div>
          </ChartsContainer>
        </div>
      </div>
    );
  },
});

export default WaterPoints;
