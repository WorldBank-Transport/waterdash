import React, { PropTypes } from 'react';
import * as func from '../../utils/functional';
import MetricStatus from './metric-status';
import CategoryFilter from '../dashboard/category-filter';
import OpenClosed from '../../constants/open-closed';

require('stylesheets/charts/waterpoint-overview-bar');

const WaterpointsOverviewBar = React.createClass({
  propTypes: {
    data: PropTypes.array,  // injected
    openClosed: PropTypes.instanceOf(OpenClosed.OptionClass),
  },

  render() {
    const data = func.Result.countBy(this.props.data, 'STATUS');
    return (
      <div className="charts-container-summary">
        <div>
          <MetricStatus metric="FUNCTIONAL" sumProps={data} title="chart.title.functional" />
          <MetricStatus metric="FUNCTIONAL NEEDS REPAIR" sumProps={data} title="chart.title.repair"/>
          <MetricStatus metric="NON FUNCTIONAL" sumProps={data} title="chart.title.non-functional"/>
          <CategoryFilter parentState={this.props.openClosed}/>
        </div>
      </div>
    );
  },
});

export default WaterpointsOverviewBar;
