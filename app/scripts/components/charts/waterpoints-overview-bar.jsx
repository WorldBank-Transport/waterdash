import React, { PropTypes } from 'react';
import * as func from '../../utils/functional';
import MetricStatus from './metric-status';
import Share from '../dashboard/share';
import CategoryFilter from '../dashboard/category-filter';
import OpenClosed from '../../constants/open-closed';
import ShouldRenderMixin from '../../utils/should-render-mixin';

require('stylesheets/charts/waterpoint-overview-bar');

const WaterpointsOverviewBar = React.createClass({
  propTypes: {
    data: PropTypes.array,  // injected
    openClosed: PropTypes.instanceOf(OpenClosed.OptionClass),
  },

  mixins: [ShouldRenderMixin],

  render() {
    const data = func.Result.countBy(this.props.data, 'STATUS');
    return (
      <div className="charts-container-summary">
        <div>
          <MetricStatus className="good" iconSymbol="✓" metric="FUNCTIONAL" sumProps={data} title="chart.title.functional" />
          <MetricStatus className="medium" iconSymbol="-" metric="FUNCTIONAL NEEDS REPAIR" sumProps={data} title="chart.title.repair"/>
          <MetricStatus className="poor" grouped={true} iconSymbol="×" metric="NON FUNCTIONAL" sumProps={data} title="chart.title.non-functional"/>
          <CategoryFilter parentState={this.props.openClosed}/>
          <Share />
        </div>
      </div>
    );
  },
});

export default WaterpointsOverviewBar;
