import React, { PropTypes } from 'react';
import { connect } from 'reflux';
import { load } from '../../actions/waterpoints';
import { toggleCharts } from '../../actions/layout';
import LayoutStore from '../../stores/layout';
import FilteredWaterpointsStore from '../../stores/filtered-waterpoints';
import WaterpointsStateStore from '../../stores/waterpoints-state';
import { TileLayer } from 'react-leaflet';
import BoundsMap from '../leaflet/bounds-map';
import WaterpointMarker from '../leaflet/waterpoint-marker';
import ChartsContainer from './charts-container';
import MetricStatus from './charts/metric-status';
import SpinnerModal from '../misc/spinner-modal';

require('stylesheets/dashboard/waterpoints');


const WaterPoints = React.createClass({
  propTypes: {
    children: PropTypes.node,
  },
  mixins: [
    connect(FilteredWaterpointsStore, 'waterpoints'),
    connect(WaterpointsStateStore, 'waterpointsState'),
    connect(LayoutStore, 'layout'),
  ],
  componentDidMount() {
    load();
  },
  render() {
    return (
      <div className="main waterpoints">
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
            state={this.state.layout.charts}>
          <MetricStatus metric="54.65" title="chart.title.functional" total="123456"/>
          <MetricStatus metric="54.65" title="chart.title.functional" total="123456"/>
          <MetricStatus metric="54.65" title="chart.title.functional" total="123456"/>
        </ChartsContainer>
      </div>
    );
  },
});

export default WaterPoints;
