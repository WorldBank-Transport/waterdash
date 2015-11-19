import React, { PropTypes } from 'react';
import * as func from '../../utils/functional';
import OpenClosed from '../../constants/open-closed';
import T from '../misc/t';
import * as m from '../../utils/metrics';
import { getNumberOr0 } from '../../utils/number';

require('stylesheets/charts/dams-overview-bar');

const DamsOverviewBar = React.createClass({
  propTypes: {
    data: PropTypes.array,  // injected
    openClosed: PropTypes.instanceOf(OpenClosed.OptionClass),
  },

  renderMetrics(metrics) {
    return Object.keys(metrics).map(metric => {
      const f = m.getDamsMetricCalc(metric);
      const value = f(getNumberOr0(metrics[metric].data[metric]), metrics[metric].data.total || 1);
      return (
        <div className={`metric-status ${metrics[metric].className}`}>
          <div className="icon">
            {metrics[metric].iconSymbol}
          </div>
          <div className="content">
            <div className="big-number">
              <span className="number">{value.toFixed(2)} {m.getDamsMetricUnit(metric)}</span>
            </div>
            <div className="context">
              <T k={metrics[metric].title} />
            </div>
          </div>
        </div>);
    });
  },

  render() {
    const metrics = {
      RESERVOIR_: {
        className: 'dams-reservoir',
        data: func.Result.sumBy(this.props.data, 'RESERVOIR_'),
        iconSymbol: 'R',
        title: 'chart.title.reservoir',
      },
      DAM_HEIGHT: {
        className: 'dams-height',
        data: func.Result.sumBy(this.props.data, 'DAM_HEIGHT'),
        iconSymbol: 'H',
        title: 'chart.title.height',
      },
      ELEVATION_: {
        className: 'dams-elevation',
        data: func.Result.sumBy(this.props.data, 'ELEVATION_'),
        iconSymbol: 'E',
        title: 'chart.title.elevation',
      },
    };
    return (
      <div className="charts-container-summary">
        <div>
          {this.renderMetrics(metrics)}
        </div>
      </div>
    );
  },
});

export default DamsOverviewBar;
