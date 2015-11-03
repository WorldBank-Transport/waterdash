/*eslint-disable react/no-set-state */
import React, { PropTypes } from 'react';
import { Maybe, _ } from 'results';
import AsyncState from '../../constants/async';
import DataTypes from '../../constants/data-types';
import ViewModes from '../../constants/view-modes';
import TSetChildProps from '../misc/t-set-child-props';
import WaterpointPopup from './waterpoint-popup';

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
      <h3>Could not find data for id '{id}'</h3>
    );
  },

  renderPointsPopup(details) {
    return DataTypes.match(this.props.dataType, {
      Waterpoints: () => (<WaterpointPopup waterpoint={details}/>),
      Boreholes: () => (<h3>There should not be a point of borehole!!</h3>),
      Dams: () => (<div>
                     <h3>I'm a points popup type: {this.props.dataType}!</h3>
                     <p>{JSON.stringify(details)}</p>
                   </div>),
    });
  },

  renderPolygonsPopup(details) {
    // TODO: move this to a new component base on the types
    return (
      <div>
        <h3>I'm a polygons popup!</h3>
        <p>{JSON.stringify(details)}</p>
      </div>
    );
  },

  render() {
    return Maybe.match(this.props.selected, {
      None: () => (  // no popup selected, render nothing
        <div style={{display: 'none'}}></div>
      ),
      Some: selected => (
        <div className="popup">
          <TSetChildProps>
            <div
                className="close-button"
                onClick={this.props.deselect}
                title={{k: 'popup.close'}}>
              &times;
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
      ),
    });
  },
});

export default Popup;
