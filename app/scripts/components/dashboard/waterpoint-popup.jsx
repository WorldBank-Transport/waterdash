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
    }
    return [className, iconSymbol];
  },

  render() {
    const [className, iconSymbol] = this.getIcon();
    return (
      <div className="waterpoint-popup">
        <div className="popup-header">
          <div className={`waterpoint-icon ${className}`}>
            <div className="icon">
              {iconSymbol}
            </div>
          </div>
          <h3>{this.props.waterpoint.WATER_POINT_NAME}</h3>
          <p className="secondary-text"><T k="popup.waterpoint.code" /> {this.props.waterpoint.WATER_POINT_CODE}</p>
        </div>

        <div className="row population-ratio">
            <h3><T k="popup.waterpoint.population-served" /></h3>
            <div className="popup-stat-container">
              <span className="big-number">{this.props.waterpoint['POPULATION SERVED']}</span>
              <span className="stat-symbol population-big">
                <img src="images/population-icon.png"/>
              </span>
            </div>
        </div>

        <div className="row bordered">
          <p className="source-label"><T k="popup.waterpoint.source-type" />: {this.props.waterpoint.SOURCE_TYPE}</p>
          <p><span className="highlight"><T k="popup.waterpoint.status-group" />:</span> {this.props.waterpoint.STATUS_GROUP}</p>
        </div>

        <div className="row bordered">
          <div>
            <h3 className="left"><span className="fa fa-wrench"></span><T k="popup.waterpoint.hardware-problem" /></h3>
            <span className="popup-stat">{this.props.waterpoint.HARDWARE_PROBLEM}</span>
          </div>
        </div>

        <div className="row bordered">
          <div className="popup-col">
            <h3><span className="fa fa-tint"></span><T k="popup.waterpoint.quantity" /></h3>
            <span className="popup-stat">{this.props.waterpoint.WATER_QUANTITY}</span>
          </div>
          <div className="popup-col">
            <h3><span className="fa fa-tint"></span><T k="popup.waterpoint.quality" /></h3>
            <span className="popup-stat">{this.props.waterpoint.WATER_QUALITY}</span>
          </div>
        </div>

        <div className="row">
          <div className="popup-col">
            <h3><span className="fa fa-dot-circle-o"></span><T k="popup.waterpoint.position" /></h3>
            <span className="location-text">{JSON.stringify(this.props.waterpoint.position)}</span>
          </div>
          <div className="popup-col">
          <h3><span className="fa fa-map-marker"></span><T k="popup.waterpoint.region" /></h3>
          <span className="location-text">{this.props.waterpoint.REGION}</span>
          </div>
        </div>

        <div className="row">
          <div className="popup-col">
            <h3><span className="fa fa-map-marker"></span><T k="popup.waterpoint.district" /></h3>
            <span className="location-text">{this.props.waterpoint.DISTRICT}</span>
          </div>
          <div className="popup-col">
            <h3><span className="fa fa-map-marker"></span><T k="popup.waterpoint.ward" /></h3>
            <span className="location-text">{this.props.waterpoint.WARD} / {this.props.waterpoint.VILLAGE} / {this.props.waterpoint.SUB_VILLAGE}</span>
          </div>
        </div>
        </div>
    );
  },
});

export default WaterpointPopup;
