import { PropTypes } from 'react';
import CircleMarker from 'react-leaflet/CircleMarker';
import latlngType from 'react-leaflet/types/latlng';
import { Map, circleMarker } from 'leaflet';

export default class WaterpointMarker extends CircleMarker {
  static propTypes = {
    center: latlngType.isRequired,
    map: PropTypes.instanceOf(Map),  // injectd by <Map>
  };

  componentWillMount() {
    super.componentWillMount();
    const { center, map, ...props } = this.props;
    this.leafletElement = circleMarker(center, {
      radius: 5,
      ...props,
    });
  }
}
