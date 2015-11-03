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
          <p className="secondary-text"><T k="popup.waterpoint.code" /> {this.props.waterpoint.WATER_POINT_CODE}</p>
        </div>
        <div className="row">
          <p className="secondary-text"><T k="popup.waterpoint.source-type" />: {this.props.waterpoint.SOURCE_TYPE}</p>
        </div>
        <div className="row">
          <div className="left">
            <h3 className="main-header"><T k="popup.waterpoint.population-served" /></h3>
            <span className="big-number">{this.props.waterpoint['POPULATION SERVED']}</span>
          </div>
          <div className="right">
            <h3 className="main-header"><T k="popup.waterpoint.hardware-problem" /></h3>
            <span className="big-number">{this.props.waterpoint.HARDWARE_PROBLEM}</span>
          </div>
        </div>
        <div className="row header">
          <div className="left">
            <h3 className="main-header"><T k="popup.waterpoint.quantity" /></h3>
            <span className="big-number">{this.props.waterpoint.WATER_QUANTITY}</span>
          </div>
          <div className="right">
            <h3 className="main-header"><T k="popup.waterpoint.quality" /></h3>
            <span className="big-number">{this.props.waterpoint.WATER_QUALITY}</span>
          </div>
        </div>
        <div className="row">
          <div>
            <h3 className="second-header"><T k="popup.waterpoint.position" /></h3>
            <span className="location-text">{JSON.stringify(this.props.waterpoint.position)}</span>
          </div>
        </div>
        <div className="row">
          <div>
            <h3 className="second-header"><T k="popup.waterpoint.region" /></h3>
            <span className="location-text">{this.props.waterpoint.REGION}</span>
          </div>
        </div>
        <div className="row">
          <div>
            <h3 className="second-header"><T k="popup.waterpoint.district" /></h3>
            <span className="location-text">{this.props.waterpoint.DISTRICT}</span>
          </div>
        </div>
        <div className="row">
          <div>
            <h3 className="second-header"><T k="popup.waterpoint.ward" /></h3>
            <span className="location-text">{this.props.waterpoint.WARD} / {this.props.waterpoint.VILLAGE} / {this.props.waterpoint.SUB_VILLAGE}</span>
          </div>
        </div>
      </div>
    );
  },
});

export default WaterpointPopup;
