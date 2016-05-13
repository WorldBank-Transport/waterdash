/*eslint-disable react/no-set-state */
import React, { PropTypes } from 'react';
import { Maybe, _ } from 'results';
import AsyncState from '../../constants/async';
import DataTypes from '../../constants/data-types';
import ViewModes from '../../constants/view-modes';
import TSetChildProps from '../misc/t-set-child-props';
import WaterpointPopup from './waterpoint-popup';
import WaterpointPolygonPopup from './waterpoint-polygon-popup';
import DamPopup from './dam-popup';
import DamPolygonPopup from './dam-polygon-popup';
import BoreholePolygonPopup from './borehole-polygon-popup';
import T from '../misc/t';

require('stylesheets/dashboard/popup');


const Popup = React.createClass({
  propTypes: {
    dataType: PropTypes.instanceOf(DataTypes.OptionClass),  // injected
    deselect: PropTypes.func,  // injected
    selected: PropTypes.instanceOf(Maybe.OptionClass),  // injected
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),  // injected
  },

  renderLoading() {
    return (
      <h3>Loading data...</h3>
    );
  },

  renderNotFound(id) {
    return (
      <h3>No data for id '{id}'</h3>
    );
  },

  renderPointsPopup(details) {
    return DataTypes.match(this.props.dataType, {
      Waterpoints: () => (<WaterpointPopup waterpoint={details}/>),
      Boreholes: () => (<h3>There should not be a point of borehole!!</h3>),
      Dams: () => (<DamPopup dam={details}/>),
    });
  },

  renderPolygonsPopup(details) {
    return Maybe.match(details.properties.data, {
      None: () => this.renderNotFound(details.id),
      Some: data => DataTypes.match(this.props.dataType, {
        Waterpoints: () => (<WaterpointPolygonPopup data={data} viewMode={this.props.viewMode}/>),
        Boreholes: () => (<BoreholePolygonPopup data={data} viewMode={this.props.viewMode}/>),
        Dams: () => (<DamPolygonPopup data={data} viewMode={this.props.viewMode}/>),
      }),
    });
  },

  render() {
    return Maybe.match(this.props.selected, {
      None: () => (  // no popup selected, render nothing
        <div style={{display: 'none'}}></div>
      ),
      Some: selected => (
      <div className="popup-wrapper" id="info-window-popup">
        <div className="popup">
          <TSetChildProps>
            <div
                className="close-button-wrapper"
                onClick={this.props.deselect}
                title={{k: 'popup.close'}}>
              <div className="close-button">&times;</div>
              <span className="close-text"><T k="popup.close" /></span>
            </div>
          </TSetChildProps>
          {AsyncState.match(selected.loadState, {
            Finished: () => Maybe.match(selected.details, {
              None: () => this.renderNotFound(selected.id),
              Some: details => ViewModes.match(this.props.viewMode, {
                Points: () => this.renderPointsPopup(details),
                [_]: () => this.renderPolygonsPopup(details),
              }),
            }),
            [_]: this.renderLoading,
          })}
        </div>
      </div>
      ),
    });
  },
});

export default Popup;
