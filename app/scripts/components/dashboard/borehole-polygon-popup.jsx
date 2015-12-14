import React,  { PropTypes } from 'react';
import T from '../misc/t';
import * as func from '../../utils/functional';
import ViewModes from '../../constants/view-modes';
import * as m from '../../utils/metrics';
import { getNumberOr0 } from '../../utils/number';

require('stylesheets/dashboard/borehole-popup');

const BoreholePolygonPopup = React.createClass({

  propTypes: {
    data: PropTypes.array.isRequired,
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),
  },

  metricSummary() {
    const metrics = {
      DIAMETER: func.Result.sumBy(this.props.data, 'DIAMETER'),
      DEPTH_METER: func.Result.sumBy(this.props.data, 'DEPTH_METER'),
      STATIC_WATER_LEVEL: func.Result.sumBy(this.props.data, 'STATIC_WATER_LEVEL'),
      DYNAMIC_WATER_LEVEL_METER: func.Result.sumBy(this.props.data, 'DYNAMIC_WATER_LEVEL_METER'),
      'DRAW _DOWN_METER': func.Result.sumBy(this.props.data, 'DRAW _DOWN_METER'),
      YIELD_METER_CUBED_PER_HOUR: func.Result.sumBy(this.props.data, 'YIELD_METER_CUBED_PER_HOUR'),
    };
    return Object.keys(metrics).map(key => {
      const f = m.boreholesMetricCal[key];
      return (<div className="popup-col">
            <h3><T k={`popup.borehole.${key}`} /></h3>
            <span className="popup-stat">{f(getNumberOr0(metrics[key][key]), metrics[key].total).toFixed(2)}</span>
        </div>);
    });
  },

  render() {
    const polyType = ViewModes.getDrillDown(this.props.viewMode);
    const polyName = this.props.data[0][polyType];
    return (
      <div className="borehole-popup">
        <div className="popup-header">
          <h3><T k={`popup.poly.${polyType}`} />: {polyName}</h3>
        </div>
        <div className="row">
            <h3><T k="popup.borehole.quantity" /></h3>
            <div className="popup-stat-container">
              <span className="big-number">{this.props.data.length}</span>
              <span className="stat-symbol borehole-big">
                <img src="images/borehole.png"/>
              </span>
            </div>
        </div>
        <div className="row">
          {this.metricSummary()}
        </div>
      </div>
    );
  },
});

export default BoreholePolygonPopup;
