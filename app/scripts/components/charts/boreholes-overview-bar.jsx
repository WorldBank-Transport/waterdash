import React, { PropTypes } from 'react';
import YearSelector from '../dashboard/year-selector';
import OpenClosed from '../../constants/open-closed';
import T from '../misc/t';
import ShouldRenderMixin from '../../utils/should-render-mixin';

require('stylesheets/charts/borehole-overview-bar');

const BoreholeOverviewBar = React.createClass({
  propTypes: {
    data: PropTypes.array,  // injected
    openClosed: PropTypes.instanceOf(OpenClosed.OptionClass),
  },

  mixins: [ShouldRenderMixin],

  renderBoreholesNumber() {
    return (
      <div className="metric-status boreholes">
        <div className="icon">B</div>
        <div className="content">
          <div className="big-number">
            <span className="number">{this.props.data.length}</span>
          </div>
          <div className="context">
            <T k="chart.title.number-boreholes" />
          </div>
        </div>
      </div>);
  },

  render() {
    return (
      <div className="charts-container-summary">
        <div>
          {this.renderBoreholesNumber()}
          <YearSelector data={this.props.data} field="YEAR_FROM"/>
        </div>
      </div>
    );
  },
});

export default BoreholeOverviewBar;
