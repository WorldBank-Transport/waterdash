import React,  { PropTypes } from 'react';
import T from '../misc/t';
import ViewModes from '../../constants/view-modes';
import * as func from '../../utils/functional';
import * as m from '../../utils/metrics';
import { getNumberOr0 } from '../../utils/number';
import {FormattedNumber, IntlMixin} from 'react-intl';

require('stylesheets/dashboard/dam-popup');

const getDamsMetricUnit = (metric) => {
  if (metric === 'DAM_HEIGHT') {
    return 'mts';
  } else if (metric === 'ELEVATION_') {
    return 'mts';
  } else if (metric === 'RESERVOIR_') {
    return (<span>M mts<sup>3</sup></span>);
  }
  return '';
};

const DamPolygonPopup = React.createClass({

  propTypes: {
    data: PropTypes.array.isRequired,
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),
  },

  mixins: [IntlMixin],

  getTopBasin() {
    const data = func.Result.countBy(this.props.data, 'BASIN');
    const basins = Object.keys(data)
                  .filter(key => key !== 'total')
                  .map(key => {
                    return {
                      name: key,
                      value: data[key],
                    };
                  })
                  .sort((a, b) => b.value - a.value);
    return `${basins[0].name} - ${basins[0].value}`;
  },

  renderMetrics() {
    const metrics = {
      RESERVOIR_: {
        data: func.Result.sumBy(this.props.data, 'RESERVOIR_'),
        title: 'popup.dam.reservoir',
      },
      ELEVATION_: {
        data: func.Result.sumBy(this.props.data, 'ELEVATION_'),
        title: 'popup.dam.elevation',
      },
      DAM_HEIGHT: {
        data: func.Result.sumBy(this.props.data, 'DAM_HEIGHT'),
        title: 'popup.dam.height',
      },
    };
    return Object.keys(metrics).map(metric => {
      const f = m.getDamsMetricCalc(metric);
      const value = f(getNumberOr0(metrics[metric].data[metric]), metrics[metric].data.total || 1);
      return (
        <div className="popup-col-third">
          <h3><T k={metrics[metric].title} /></h3>
          <span className="popup-stat polygon-stat"><FormattedNumber maximumFractionDigits="2" minimumFractionDigits="2" value={value} /> <span className="metric-unit">{getDamsMetricUnit(metric)}</span></span>
        </div>
        );
    });
  },

  render() {
    const polyType = ViewModes.getDrillDown(this.props.viewMode);
    const polyName = this.props.data[0][polyType];
    const basin = this.getTopBasin();
    return (
      <div className="dam-popup">
        <div className="popup-header polygon-dam-header">
          <h3><T k={`popup.poly.${polyType}`} />: {polyName}</h3>
        </div>
        <div className="row bordered">
          <h3><T k="popup.dams-poly.quantity" /></h3>
          <div className="popup-stat-container">
            <span className="big-number"><FormattedNumber value={this.props.data.length} /></span>
            <span className="stat-symbol dam-big">
              <img src="images/dams.png"/>
            </span>
          </div>
        </div>

        <div className="row bordered">
          {this.renderMetrics()}
        </div>
        <div className="row">
            <h3><T k="popup.dams-poly.basin" /></h3>
            <span className="popup-stat polygon-stat">{basin}</span>
        </div>
      </div>
    );
  },
});

export default DamPolygonPopup;
