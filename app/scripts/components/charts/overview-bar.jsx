import React, { PropTypes } from 'react';
import { _ } from 'results';  // catch-all for match
import * as func from '../../utils/functional';
import DataTypes from '../../constants/data-types';
import MetricStatus from './metric-status';

require('stylesheets/charts/overview-bar');

const OverviewBar = React.createClass({
  propTypes: {
    data: PropTypes.array.isRequired,
    dataType: PropTypes.instanceOf(DataTypes.OptionClass).isRequired,
  },
  renderWaterpoints() {
    const data = func.Result.countBy(this.props.data, 'STATUS');
    return (
      <div className="waterpoints-metrics">
        <MetricStatus metric="FUNCTIONAL" sumProps={data} title="chart.title.functional" />
        <MetricStatus metric="FUNCTIONAL NEEDS REPAIR" sumProps={data} title="chart.title.repair" />
        <MetricStatus metric="NON FUNCTIONAL" sumProps={data} title="chart.title.non-functional" />
      </div>
    );
  },
  renderOther() {
    return 'not yet implemented';
  },
  render() {
    return (
      <div className="overview-bar">
        {DataTypes.match(this.props.dataType, {
          Waterpoints: this.renderWaterpoints,
          [_]: this.renderOther,
        })}
      </div>
    );
  },
});

export default OverviewBar;
