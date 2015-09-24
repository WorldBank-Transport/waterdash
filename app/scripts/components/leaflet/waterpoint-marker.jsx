import React, { PropTypes } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Map } from 'leaflet';

const WaterpointMarker = React.createClass({
  propTypes: {
    LATITUDE: PropTypes.number.isRequired,
    LONGITUDE: PropTypes.number.isRequired,
    WATER_POINT_CODE: PropTypes.string.isRequired,
    WATER_POINT_NAME: PropTypes.string.isRequired,
    children: PropTypes.node,
    map: PropTypes.instanceOf(Map),  // injectd by <Map>
  },
  render() {
    const { children, map, LATITUDE, LONGITUDE } = this.props;
    return (
      <Marker map={map} position={[LATITUDE, LONGITUDE]}>
        <Popup map={map}>
          <div>
            <h2>hello my name is {this.props.WATER_POINT_NAME}</h2>
            <p>I am a waterpoint</p>
            {children}
          </div>
        </Popup>
      </Marker>
    );
  },
});

export default WaterpointMarker;
