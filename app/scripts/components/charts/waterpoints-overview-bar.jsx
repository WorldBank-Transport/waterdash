import React from 'react';
import T from '../misc/t';
import * as func from '../../utils/functional';
import MetricStatus from './metric-status';
import CategoryFilter from '../dashboard/category-filter';

require('stylesheets/charts/waterpoint-overview-bar');

const WaterpointsOverviewBar = React.createClass({
  render() {
    const data = func.Result.countBy(this.props.data, 'STATUS');
    return (
      <div className="charts-container-summary">
        <div>
          <MetricStatus metric="FUNCTIONAL" sumProps={data} title="chart.title.functional" />
          <MetricStatus metric="FUNCTIONAL NEEDS REPAIR" sumProps={data} title="chart.title.repair"/>
          <MetricStatus metric="NON FUNCTIONAL" sumProps={data} title="chart.title.non-functional"/>
          <CategoryFilter parentState={this.props.state}/>
        </div>
      </div>
    );
  },
});

export default WaterpointsOverviewBar;