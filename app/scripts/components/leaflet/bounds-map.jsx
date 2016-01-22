/* eslint react/no-set-state: 0 */  // needed for wrapping leaflet
import Leaflet from 'leaflet';
import boundsType from 'react-leaflet/lib/types/bounds';
import LeafletMap from 'react-leaflet/lib/Map';
import DataTypes from '../../constants/data-types';

const boundsPropTypes = {
  ...LeafletMap.propTypes,
  bounds: boundsType,
  dataType: DataTypes,
};
delete boundsPropTypes.center;
delete boundsPropTypes.zoom;

/**
 * A Map component that sets its view by bounds instead of center/zoom
 */
export default class BoundsMap extends LeafletMap {
  static propTypes = boundsPropTypes;

  componentDidMount() {
    super.componentDidMount();
    setTimeout(() => {  // in dev, wait for CSS to be injected
      this.leafletElement.fitBounds(this.props.bounds);
    }, 0);
    this.setState({map: this.leafletElement});
  }

  componentDidUpdate({ bounds: oldBounds, dataType: oldDataType }) {
    const { bounds, dataType } = this.props;
    if (bounds && this.shouldUpdateBounds(bounds, oldBounds, dataType, oldDataType)) {
      this.leafletElement.fitBounds(bounds);
    }
  }

  shouldUpdateBounds(next, prev, dataType, oldDataType) {
    if (!prev) {
      return true;
    }
    if (!dataType.equals(oldDataType)) {
      return true;
    }
    const nextLLB = Leaflet.latLngBounds(next);
    const prevLLB = Leaflet.latLngBounds(prev);
    return !nextLLB.equals(prevLLB);
    //return true;
  }
}
