import React,  { PropTypes } from 'react';
import T from '../misc/t';
import ViewModes from '../../constants/view-modes';
import { connect } from 'reflux';
import PopulationStore from '../../stores/population';
import * as func from '../../utils/functional';
import MetricStatus from '../charts/metric-status';
import {load} from '../../actions/population';
import {FormattedNumber, IntlMixin} from 'react-intl';

require('stylesheets/dashboard/waterpoint-popup');

const WaterpointPolygonPopup = React.createClass({

  propTypes: {
    data: PropTypes.array.isRequired,
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),
  },
  mixins: [
    connect(PopulationStore, 'population'),
    IntlMixin,
  ],

  componentWillMount() {
    load();
  },

  getRatio(polyType, polyName) {
    const popAgg = func.Result.sumByGroupBy(this.state.population, polyType, ['TOTAL']);
    const popPoly = popAgg[polyName] || [{TOTAL: 0}];
    return (popPoly[0].TOTAL / this.props.data.length);
  },

  getTopProblem() {
    const data = func.Result.countBy(this.props.data, 'HARDWARE_PROBLEM');
    const problems = Object.keys(data)
                  .filter(key => key !== 'NONE' && key !== 'total')
                  .map(key => {
                    return {
                      name: key,
                      value: data[key],
                    };
                  })
                  .sort((a, b) => b.value - a.value);
    return `${problems[0].name} - ${problems[0].value}`;
  },

  render() {
    const polyType = ViewModes.getDrillDown(this.props.viewMode);
    const polyName = this.props.data[0][polyType];
    const pwRatio = this.getRatio(polyType, polyName);
    const status = func.Result.countBy(this.props.data, 'STATUS');
    const topProblem = this.getTopProblem();
    return (
      <div className="waterpoint-popup polygon" id="info-window-popup">
      <div className="popup-header">
        <h3 className="main-header"><T k={`popup.poly.${polyType}`} />: {polyName}</h3>
      </div>

      <div className="row population-ratio bordered">
        <h3><T k="popup.waterpoint-poly.population-waterpoint-ratio" /></h3>
        <div className="popup-stat-container">
          <span className="big-number">
            <FormattedNumber maximumFractionDigits="2" minimumFractionDigits="2" value={pwRatio} />
          </span>
          <span className="stat-symbol population-big">
            <img src="images/population-icon.png"/>
          </span>
        </div>
      </div>
      <div className="row bordered">
        <div className="popup-col-third">
          <MetricStatus className="good" iconSymbol="✓" metric="FUNCTIONAL" sumProps={status} title="chart.title.functional" />
        </div>
        <div className="popup-col-third">
          <MetricStatus className="medium" iconSymbol="-" metric="FUNCTIONAL NEEDS REPAIR" sumProps={status} title="chart.title.repair"/>
        </div>
        <div className="popup-col-third">
          <MetricStatus className="poor" grouped={true} iconSymbol="×" metric="NON FUNCTIONAL" sumProps={status} title="chart.title.non-functional"/>
        </div>
      </div>

      <div className="row">
        <h3 className="left"><span className="fa fa-tint"></span><T k="popup.waterpoint-poly.waterpoints" /></h3>
        <span className="popup-stat left"><FormattedNumber value={this.props.data.length}/></span>
      </div>
      <div className="row">
        <h3 className="left"><span className="fa fa-wrench"></span><T k="popup.waterpoint-poly.top-problem" /></h3>
        <span className="popup-stat left">{topProblem}</span>
      </div>
      </div>
    );
  },
});

export default WaterpointPolygonPopup;
