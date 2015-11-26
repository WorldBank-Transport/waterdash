import React,  { PropTypes } from 'react';
import T from '../misc/t';
import ViewModes from '../../constants/view-modes';
import { connect } from 'reflux';
import PopulationStore from '../../stores/population';
import * as func from '../../utils/functional';
import MetricStatus from '../charts/metric-status';
import {load} from '../../actions/population';

require('stylesheets/dashboard/waterpoint-popup');

const WaterpointPolygonPopup = React.createClass({

  propTypes: {
    data: PropTypes.object.require,
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),
  },
  mixins: [
    connect(PopulationStore, 'population'),
  ],

  componentWillMount() {
    load();
  },

  getRatio(polyType, polyName) {
    const popAgg = func.Result.sumByGroupBy(this.state.population, polyType, ['TOTAL']);
    const popPoly = popAgg[polyName] || [{TOTAL: 0}];
    return (popPoly[0].TOTAL / this.props.data.length).toFixed(2);
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
      <div className="waterpoint-popup">
        <div className="row header">
          <h3 className="main-header"><T k={`popup.poly.${polyType}`} />: {polyName}</h3>
        </div>
        <div className="row header">
          <div className="left">
            <h3 className="main-header"><T k="popup.waterpoint-poly.population-waterpoint-ratio" /></h3>
            <span className="big-number">{pwRatio}</span>
          </div>
        </div>
        <div className="row header">
          <div className="left">
            <MetricStatus className="good" iconSymbol="✓" metric="FUNCTIONAL" sumProps={status} title="chart.title.functional" />
            <MetricStatus className="medium" iconSymbol="-" metric="FUNCTIONAL NEEDS REPAIR" sumProps={status} title="chart.title.repair"/>
            <MetricStatus className="poor" grouped={true} iconSymbol="×" metric="NON FUNCTIONAL" sumProps={status} title="chart.title.non-functional"/>
          </div>
        </div>
        <div className="row header">
          <div className="left">
            <h3 className="main-header"><T k="popup.waterpoint-poly.waterpoints" /></h3>
            <span className="big-number">{this.props.data.length}</span>
          </div>
        </div>
        <div className="row header">
          <div className="left">
            <h3 className="second-header"><T k="popup.waterpoint-poly.top-problem" /></h3>
            <span className="location-text">{topProblem}</span>
          </div>
        </div>
      </div>
    );
  },
});

export default WaterpointPolygonPopup;
