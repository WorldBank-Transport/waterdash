import React, { PropTypes } from 'react';
import * as func from '../../utils/functional';
import MetricStatus from './metric-status';
import CategoryFilter from '../dashboard/category-filter';
import OpenClosed from '../../constants/open-closed';

require('stylesheets/charts/borehole-overview-bar');

const BoreholeOverviewBar = React.createClass({
  propTypes: {
    data: PropTypes.array,  // injected
    openClosed: PropTypes.instanceOf(OpenClosed.OptionClass),
  },

  render() {
    const data = func.Result.sumBy(this.props.data, 'STATUS');
    return (
      <div className="charts-container-summary">
        <div>
          <!--MetricStatus metric="FUNCTIONAL" sumProps={data} title="chart.title.functional" /-->
          <YearSelector data={this.props.data} field="YEAR_FROM"/>
        </div>
      </div>
    );
  },
});

export default BoreholeOverviewBar;