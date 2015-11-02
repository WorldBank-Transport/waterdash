import React,  { PropTypes } from 'react';
import T from '../misc/t';

require('stylesheets/dashboard/waterpoint-popup');

const WaterpointPopup = React.createClass({

  propTypes: {
    waterpoint: PropTypes.object.require,
  },

  getIcon() {
    let className, iconSymbol;
    if (this.props.waterpoint.STATUS === 'FUNCTIONAL') {  // some condition
      className = 'good';
      iconSymbol = '✓';
    } else if (this.props.waterpoint.STATUS === 'FUNCTIONAL NEEDS REPAIR') {
      className = 'medium';
      iconSymbol = '-';
    } else {
      className = 'poor';
      iconSymbol = '×';
    };
    return [className, iconSymbol];
  },

  render() {
    const [className, iconSymbol] = this.getIcon();
    return (
      <div className="waterpoint-popup">
        <div className="row header">
          <div className={`waterpoint-icon ${className}`}>
            <div className="icon">
              {iconSymbol}
            </div>
          </div>
          <h3 className="main-header">{this.props.waterpoint.WATER_POINT_NAME}</h3>
          <p><T k="popup.waterpoint.code" /> {this.props.waterpoint.WATER_POINT_CODE}</p>
        </div>
        <div className="row">
          <T k="popup.waterpoint.source-type" />
          {this.props.waterpoint.SOURCE_TYPE}
        </div>
        <div className="row">
          <div className="left">
            <h3 className="main-header"><T k="popup.waterpoint.population-served" /></h3>
            {this.props.waterpoint['POPULATION SERVED']}
          </div>
          <div className="right">
            <h3 className="main-header"><T k="popup.waterpoint.hardware-problem" /></h3>
            {this.props.waterpoint.HARDWARE_PROBLEM}
          </div>
        </div>
        <div className="row header">
          <div className="left">
            <h3 className="main-header"><T k="popup.waterpoint.quantity" /></h3>
            {this.props.waterpoint.WATER_QUANTITY}
          </div>
          <div className="right">
            <h3 className="main-header"><T k="popup.waterpoint.quality" /></h3>
            {this.props.waterpoint.WATER_QUALITY}
          </div>
        </div>
        <div className="row">
          <T k="popup.waterpoint.location" />
        </div>
        <div className="row">
          <T k="popup.waterpoint.position" />
          {this.props.waterpoint.position}
        </div>
        <div className="row">
          <T k="popup.waterpoint.region" />
          {this.props.waterpoint.REGION}
        </div>
        <div className="row">
          <T k="popup.waterpoint.district" />
          {this.props.waterpoint.DISTRICT}
        </div>
        <div className="row">
          <T k="popup.waterpoint.ward" />
          {this.props.waterpoint.WARD} / {this.props.waterpoint.VILLAGE} / {this.props.waterpoint.SUB_VILLAGE}
        </div>
      </div>
      //{"POPULATION SERVED":0,"WATER_POINT_CODE":"01043013271WP01_420","WATER_POINT_NAME":"BOMBANI","STATUS":"FUNCTIONAL","REGION":"DODOMA","DISTRICT":"CHAMWINO","WARD":"CHINUGULU","VILLAGE":"CHINUGULU","HARDWARE_PROBLEM":"NONE","WATER_QUALITY":"SALTY","WATER_QUANTITY":"INSUFFICIENT","SOURCE_TYPE":"MACHINE DBH","position":[-6.895581543,35.39441686]}
    );
  },
});

export default WaterpointPopup;
