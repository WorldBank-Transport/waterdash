import React, { PropTypes } from 'react';
import T from '../misc/t';
import ViewMode from '../boilerplate/view-mode';
import MetricStatus from './charts/metric-status';
import * as func from '../../utils/functional';

require('stylesheets/dashboard/charts-container');

const ChartsContainer = React.createClass({
  propTypes: {
    children: PropTypes.node.isRequired,
    onToggle: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired,
    waterpoints: PropTypes.object.isRequired,
  },
  toggle(e) {
    e.preventDefault();
    this.props.onToggle();
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
            <a
                className="tab-label"
                href="#"
                onClick={this.toggle}
                role="button">
              <T k="charts.toggle.activate" />
            </a>
            <ViewMode />
          </div>
          <div className="charts-container-summary">
            {func.Result.sumByProp(this.props.waterpoints, 'STATUS').andThen(data =>
              <div>
                <MetricStatus metric="FUNCTIONAL" sumProps={data} title="chart.title.functional" />
                <MetricStatus metric="FUNCTIONAL NEEDS REPAIR" sumProps={data} title="chart.title.repair"/>
                <MetricStatus metric="NON FUNCTIONAL" sumProps={data} title="chart.title.non-functional"/>
              </div>
            )}
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
