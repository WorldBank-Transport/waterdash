/* eslint react/no-set-state: 0 */  // needed for wrapping leaflet
import assign from 'object-assign';
import Leaflet from 'leaflet';
import boundsType from 'react-leaflet/types/bounds';
import LeafletMap from 'react-leaflet/Map';

const boundsPropTypes = assign({}, LeafletMap.propTypes);
boundsPropTypes.bounds = boundsType;
delete boundsPropTypes.center;
delete boundsPropTypes.zoom;

/**
 * A Map component that sets its view by bounds instead of center/zoom
 */
export default class BoundsMap extends LeafletMap {
  static propTypes = boundsPropTypes;

  componentDidMount() {
    super.componentDidMount();
    this.leafletElement.fitBounds(this.props.bounds);
    this.setState({map: this.leafletElement});
  }

  componentDidUpdate({ bounds: oldBounds }) {
    const { bounds } = this.props;
    if (bounds && this.shouldUpdateBounds(bounds, oldBounds)) {
      this.leafletElement.fitBounds(bounds);
    }
  }

  shouldUpdateBounds(next, prev) {
    if (!prev) {
      return true;
    }
    const nextLLB = Leaflet.latLngBounds(next);
    const prevLLB = Leaflet.latLngBounds(prev);
    return !nextLLB.equals(prevLLB);
  }
}
