import React,  { PropTypes } from 'react';
import T from '../misc/t';
import ViewModes from '../../constants/view-modes';
import * as func from '../../utils/functional';
import * as m from '../../utils/metrics';
import { getNumberOr0 } from '../../utils/number';

require('stylesheets/dashboard/dam-popup');

const DamPolygonPopup = React.createClass({

  propTypes: {
    data: PropTypes.object.require,
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),
  },

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
      DAM_HEIGHT: {
        data: func.Result.sumBy(this.props.data, 'DAM_HEIGHT'),
        title: 'popup.dam.height',
      },
      ELEVATION_: {
        data: func.Result.sumBy(this.props.data, 'ELEVATION_'),
        title: 'popup.dam.elevation',
      },
    };
    return Object.keys(metrics).map(metric => {
      const f = m.getDamsMetricCalc(metric);
      const value = f(getNumberOr0(metrics[metric].data[metric]), metrics[metric].data.total || 1);
      return (
        <div className="row">
          <h3 className="main-header"><T k={metrics[metric].title} /></h3>
          <span className="medium-number">{value.toFixed(2)} {m.getDamsMetricUnit(metric)}</span>
        </div>);
    });
  },

  render() {
    const polyType = ViewModes.getDrillDown(this.props.viewMode);
    const polyName = this.props.data[0][polyType];
    const basin = this.getTopBasin();
    return (
      <div className="dam-popup">
        <div className="row header">
          <h3 className="main-header"><T k={`popup.poly.${polyType}`} />: {polyName}</h3>
        </div>
        <div className="row header">
          <div className="left">
            <h3 className="main-header"><T k="popup.dams-poly.quantity" /></h3>
            <span className="big-number">{this.props.data.length}</span>
          </div>
        </div>
        <div className="row header">
          {this.renderMetrics()}
        </div>
        <div className="row header">
          <div className="left">
            <h3 className="main-header"><T k="popup.dams-poly.basin" /></h3>
            <span className="big-number">{basin}</span>
          </div>
        </div>
      </div>
    );
  },
});

export default DamPolygonPopup;
