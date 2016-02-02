import React, { PropTypes } from 'react';
import { connect } from 'reflux';
import { Result } from '../../utils/functional';
import MetricStatus from './metric-status';
import CategoryFilter from '../dashboard/category-filter';
import OpenClosed from '../../constants/open-closed';
import ShouldRenderMixin from '../../utils/should-render-mixin';
import { toggleStatus } from '../../actions/waterpoint-status';
import WaterpointStatusStore from '../../stores/waterpoint-status';

require('stylesheets/charts/waterpoint-overview-bar');

const WaterpointsOverviewBar = React.createClass({
  propTypes: {
    data: PropTypes.array,  // injected
    openClosed: PropTypes.instanceOf(OpenClosed.OptionClass),
  },

  mixins: [
    connect(WaterpointStatusStore, 'status'),
    ShouldRenderMixin,
  ],

  select(status) {
    return () => {
      toggleStatus(status);
    };
  },

  render() {
    const data = Result.countBy(this.props.data, 'STATUS');
    return (
      <div className="charts-container-summary">
        <div>
          <MetricStatus className={this.state.status.FUNCTIONAL ? 'good' : 'dissable'} iconSymbol="✓" metric="FUNCTIONAL" select={this.select('FUNCTIONAL')} sumProps={data} title="chart.title.functional" />
          <MetricStatus className={this.state.status['FUNCTIONAL NEEDS REPAIR'] ? 'medium' : 'dissable'} iconSymbol="-" metric="FUNCTIONAL NEEDS REPAIR"  select={this.select('FUNCTIONAL NEEDS REPAIR')} sumProps={data} title="chart.title.repair" />
          <MetricStatus className={this.state.status['NON FUNCTIONAL'] ? 'poor' : 'dissable'} grouped={true} iconSymbol="×" metric="NON FUNCTIONAL" select={this.select('NON FUNCTIONAL')} sumProps={data} title="chart.title.non-functional"/>
          <CategoryFilter parentState={this.props.openClosed}/>
        </div>
      </div>
    );
  },
});

export default WaterpointsOverviewBar;
