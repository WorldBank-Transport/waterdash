import React,  { PropTypes } from 'react';
import T from '../misc/t';

require('stylesheets/dashboard/dam-popup');

const DamPopup = React.createClass({

  propTypes: {
    dam: PropTypes.object.require,
  },

  render() {
    return (
      <div className="dam-popup">
        <div className="row header">
          <h3 className="main-header"><T k="popup.dam.name" />: {this.props.dam.DAM_NAME}</h3>
          <span className="location-text"><T k="popup.dam.basin" />: {this.props.dam.BASIN}</span>
        </div>
        <div className="row header">
          <div className="row">
            <h3 className="main-header"><T k="popup.dam.elevation" /></h3>
            <span className="medium-number">{this.props.dam.ELEVATION_}</span>
          </div>
          <div className="row">
            <h3 className="main-header"><T k="popup.dam.height" /></h3>
            <span className="medium-number">{this.props.dam.DAM_HEIGHT}</span>
          </div>
          <div className="row">
            <h3 className="main-header"><T k="popup.dam.reservoir" /></h3>
            <span className="medium-number">{this.props.dam.RESERVOIR_}</span>
          </div>
        </div>
        <div className="row header">
          <div>
            <h3 className="second-header"><T k="popup.dam.position" /></h3>
            <span className="location-text">{JSON.stringify(this.props.dam.position)}</span>
          </div>
        </div>
        <div className="row">
          <div>
            <h3 className="second-header"><T k="popup.dam.region" /></h3>
            <span className="location-text">{this.props.dam.REGION}</span>
          </div>
        </div>
        <div className="row">
          <div>
            <h3 className="second-header"><T k="popup.dam.district" /></h3>
            <span className="location-text">{this.props.dam.DISTRICT}</span>
          </div>
        </div>
      </div>
    );
  },
});

export default DamPopup;
