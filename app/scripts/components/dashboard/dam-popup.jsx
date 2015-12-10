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
        <div className="popup-header">
          <img className="dam-popup-icon" src="images/dams.png"/>
          <h3><T k="popup.dam.name" />: {this.props.dam.DAM_NAME}</h3>
          <span className="secondary-text"><T k="popup.dam.basin" />: {this.props.dam.BASIN}</span>
        </div>

        <div className="row bordered">
          <div className="popup-col">
            <h3><img className="dam-popup-icon small" src="images/dams-blue.png"/><T k="popup.dam.elevation" /></h3>
            <span className="popup-stat">{this.props.dam.ELEVATION_}</span>
          </div>
          <div className="popup-col">
            <h3><img className="dam-popup-icon small" src="images/dams-blue.png"/><T k="popup.dam.height" /></h3>
            <span className="popup-stat">{this.props.dam.DAM_HEIGHT}</span>
          </div>
        </div>

        <div className="row bordered">
          <div className="popup-col">
            <h3><span className="fa fa-tint"></span><T k="popup.dam.reservoir" /></h3>
            <span className="popup-stat">{this.props.dam.RESERVOIR_}</span>
          </div>
          <div className="popup-col">
            <h3><span className="fa fa-dot-circle-o"></span><T k="popup.dam.position" /></h3>
            <span className="popup-stat">{JSON.stringify(this.props.dam.position)}</span>
          </div>
        </div>

        <div className="row">
          <div className="popup-col">
            <h3><span className="fa fa-map-marker"></span><T k="popup.dam.region" /></h3>
            <span className="popup-stat">{this.props.dam.REGION}</span>
          </div>
          <div className="popup-col">
            <h3><span className="fa fa-map-marker"></span><T k="popup.dam.district" /></h3>
            <span className="popup-stat">{this.props.dam.DISTRICT}</span>
          </div>
        </div>

      </div>
    );
  },
});

export default DamPopup;
