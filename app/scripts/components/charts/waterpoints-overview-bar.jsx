import React, { PropTypes } from 'react';
import * as func from '../../utils/functional';
import MetricStatus from './metric-status';
import CategoryFilter from '../dashboard/category-filter';
import OpenClosed from '../../constants/open-closed';
import ShouldRenderMixin from '../../utils/should-render-mixin';
import { setExclude } from '../../actions/filters';

require('stylesheets/charts/waterpoint-overview-bar');

const WaterpointsOverviewBar = React.createClass({
  propTypes: {
    data: PropTypes.array,  // injected
    openClosed: PropTypes.instanceOf(OpenClosed.OptionClass),
  },

  mixins: [ShouldRenderMixin],

  getInitialState() {
    return {
      FUNCTIONAL: true,
      'FUNCTIONAL NEEDS REPAIR': true,
      'NON FUNCTIONAL': true,
    };
  },

  select(status) {
    return () => {
      const newState = {
        ...this.state,
        [status]: !this.state[status],
      };
      this.replaceState(newState);
      const statuses = Object.keys(newState).filter(s => !newState[s]);
      const statusWinNonFunctional = [];
      statuses.forEach(s => {
        if (s === 'NON FUNCTIONAL') {
          statusWinNonFunctional.push('NON FUNCTIONAL > 6M');
          statusWinNonFunctional.push('NON FUNCTIONAL > 3M');
          statusWinNonFunctional.push('NON FUNCTIONAL < 6M');
          statusWinNonFunctional.push('NON FUNCTIONAL < 3M');
        }
        statusWinNonFunctional.push(s);
      });
      setExclude('STATUS', statusWinNonFunctional);
    };
  },

  render() {
    const data = func.Result.countBy(this.props.data, 'STATUS');
    return (
      <div className="charts-container-summary">
        <div>
          <MetricStatus className={this.state.FUNCTIONAL ? 'good' : 'dissable'} iconSymbol="✓" metric="FUNCTIONAL" select={this.select('FUNCTIONAL')} sumProps={data} title="chart.title.functional" />
          <MetricStatus className={this.state['FUNCTIONAL NEEDS REPAIR'] ? 'medium' : 'dissable'} iconSymbol="-" metric="FUNCTIONAL NEEDS REPAIR"  select={this.select('FUNCTIONAL NEEDS REPAIR')} sumProps={data} title="chart.title.repair" />
          <MetricStatus className={this.state['NON FUNCTIONAL'] ? 'poor' : 'dissable'} grouped={true} iconSymbol="×" metric="NON FUNCTIONAL" select={this.select('NON FUNCTIONAL')} sumProps={data} title="chart.title.non-functional"/>
          <CategoryFilter parentState={this.props.openClosed}/>
        </div>
      </div>
    );
  },
});

export default WaterpointsOverviewBar;
