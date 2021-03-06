import pick from 'lodash/object/pick';
import { Maybe, _ } from 'results';
import React, { PropTypes } from 'react';
import { Map } from 'leaflet';

import DataTypes from '../../constants/data-types';
import ViewModes from '../../constants/view-modes';

import ClusteredWaterpoints from '../leaflet/clustered-points';
import ClusterLegend from './cluster-legend';
import SimplePoints from '../leaflet/simple-points';
import { Marker } from 'react-leaflet';
import AsyncState from '../../constants/async';

const PointsMap = React.createClass({
  propTypes: {
    children: PropTypes.node,  // for selected point popup
    data: PropTypes.array,  // injected
    dataType: PropTypes.instanceOf(DataTypes.OptionClass),  // injected
    deselect: PropTypes.func,  // injected
    map: PropTypes.instanceOf(Map),  // injected by BoundsMap
    select: PropTypes.func,  // injected
    selected: PropTypes.instanceOf(Maybe.OptionClass),  // injected
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),  // injected
  },

  shouldComponentUpdate(nextProps) {
    return this.props.data !== nextProps.data
      || this.props.selected !== nextProps.selected;
  },

  render() {
    const propsForPopup = pick(this.props,
      [ 'data', 'dataType', 'deselect', 'selected', 'viewMode' ]);
    const popup = this.props.children ?
      React.cloneElement(this.props.children, propsForPopup) : null;
    const propsForMaps = {
      dataType: this.props.dataType,
      map: this.props.map,
      points: this.props.data,
      select: this.props.select,
      deselect: this.props.deselect,
    };
    const mapPoints = DataTypes.match(this.props.dataType, {
      Waterpoints: () => <ClusteredWaterpoints {...propsForMaps}/>,
      Boreholes: () => (<div style={{display: 'none'}} />),
      Dams: () => (<SimplePoints {...propsForMaps}/>),
    });
    const selectedPoint = Maybe.match(this.props.selected, {
      None: () => (  // no popup selected, render nothing
        <div style={{display: 'none'}}></div>
      ),
      Some: selected => {
        return AsyncState.match(selected.loadState, {
          Finished: () => Maybe.match(selected.details, {
            Some: details => (<Marker map={this.props.map} position={details.position}/>),
            [_]: () => (<div style={{display: 'none'}}></div>),
          }),
          [_]: () => (<div style={{display: 'none'}}></div>),
        });
      },
    });

    return (
      <div>
        {mapPoints}
        {selectedPoint}
        {/* A point popup, if a point is selected */}
        {popup}
        <ClusterLegend dataType={this.props.dataType}/>
      </div>
    );
  },
});

export default PointsMap;
