import React, { PropTypes } from 'react';
import T from '../misc/t';
import ViewMode from '../boilerplate/view-mode';
import MetricStatus from './charts/metric-status';

require('stylesheets/dashboard/charts-container');

const ChartsContainer = React.createClass({
  propTypes: {
    children: PropTypes.node.isRequired,
    onToggle: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired,
  },
  render() {
    const [ stateClass, below ] = this.props.state.match({
      Open: () => [ 'open', this.props.children ],
      Closed: () => [ 'closed', []],
    });
    return (
      <div className={`charts-container ${stateClass}`}>
        <div className="above">
          <div className="charts-container-nav">
            <span
                className="tab-label"
                onClick={this.props.onToggle}
                role="button">
              <T k="charts.toggle.activate" />
            </span>
            <ViewMode />
          </div>
          <div className="charts-container-summary">
            <MetricStatus metric={54.65} title="chart.title.functional" total={123456} />
            <MetricStatus metric={54.65} title="chart.title.functional" total={123456} />
            <MetricStatus metric={54.65} title="chart.title.functional" total={123456} />
          </div>
        </div>
        <div className="below">
          {below}
        </div>
      </div>
    );
  },
});

export default ChartsContainer;
