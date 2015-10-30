import React, { PropTypes } from 'react';
import { Maybe, _ } from 'results';
import AsyncState from '../../constants/async';
import warn from '../../utils/warn';

require('stylesheets/dashboard/popup');


const Popup = React.createClass({
  propTypes: {
    selected: PropTypes.instanceOf(Maybe.OptionClass),  // injected
  },

  renderWTF() {
    warn('Popup component mounted when no point or poly is selected (at least' +
      ' in the selected store). This is probably a bug. Nothing will be drawn' +
      ' on the screen for the popup. Check `app.jsx` to make sure routing is' +
      ' correct, polygons-map and points-map to make sure they are passing' +
      ' `selected` as prop to the popup, and `stores/selected.jsx` to make' +
      ' sure it is selecting properly.');
    return <div style={{display: 'none'}}></div>;
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

  renderPopup(details) {
    return (
      <div>
        <h3>I'm a popup!</h3>
        <p>{JSON.stringify(details)}</p>
      </div>
    );
  },

  render() {
    return Maybe.match(this.props.selected, {
      None: this.renderWTF,
      Some: selected => (
        <div className="popup">
          {AsyncState.match(selected.loadState, {
            Finished: () => Maybe.match(selected.details, {
              None: () => this.renderNotFound(selected.id),
              Some: details => this.renderPopup(details),
            }),
            [_]: this.renderLoading,
          })}
        </div>
      ),
    });
  },
});

export default Popup;
