import React, { PropTypes } from 'react';
import { Popup } from 'react-leaflet';
import PopupContainer from 'react-leaflet/PopupContainer';
import { Map, Icon, marker } from 'leaflet';

export default class WaterpointMarker extends PopupContainer {
  static propTypes = {
    LATITUDE: PropTypes.number.isRequired,
    LONGITUDE: PropTypes.number.isRequired,
    WATER_POINT_CODE: PropTypes.string.isRequired,
    WATER_POINT_NAME: PropTypes.string.isRequired,
    icon: PropTypes.instanceOf(Icon),
    map: PropTypes.instanceOf(Map),  // injectd by <Map>
    opacity: PropTypes.number,
    zIndexOffset: PropTypes.number,
  };

  componentWillMount() {
    super.componentWillMount();
    const { map, LATITUDE, LONGITUDE, ...props } = this.props;
    this.leafletElement = marker([LATITUDE, LONGITUDE], props);
  }

  componentDidUpdate(prevProps) {
    const { LATITUDE, LONGITUDE } = this.props;
    if (LATITUDE !== prevProps.LATITUDE ||
        LONGITUDE !== prevProps.LONGITUDE) {
      this.leafletElement.setLatLng([LATITUDE, LONGITUDE]);
    }
    if (this.props.icon !== prevProps.icon) {
      this.leafletElement.setIcon(this.props.icon);
    }
    if (this.props.zIndexOffset !== prevProps.zIndexOffset) {
      this.leafletElement.setZIndexOffset(this.props.zIndexOffset);
    }
    if (this.props.opacity !== prevProps.opacity) {
      this.leafletElement.setOpacity(this.props.opacity);
    }
  }

  render() {
    const reactLeafletProps = {
      map: this.props.map,
      popupContainer: this.leafletElement,
    };
    return (
      <div style={{display: 'none'}}>
        <Popup {...reactLeafletProps}>
          <div>
            <h2>hello my name is {this.props.WATER_POINT_NAME}</h2>
            <p>I am a waterpoint</p>
          </div>
        </Popup>
      </div>
    );
  }
}
