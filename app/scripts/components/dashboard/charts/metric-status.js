import React from 'react';
import T from '../../misc/t';

require('stylesheets/dashboard/charts/metric-status');

const MetricStatus = React.createClass({
  propTypes: {
    metric: React.PropTypes.number.isRequired,
    title: React.PropTypes.string.isRequired,
    total: React.PropTypes.number.isRequired,
  },

  render() {
    let className, iconSymbol;
    if (Math.random() < 1 / 3.0) {  // some condition
      className = 'good';
      iconSymbol = '✓';
    } else if (Math.random() < 1 / 2.0) {
      className = 'medium';
      iconSymbol = '-';
    } else {
      className = 'poor';
      iconSymbol = '×';
    }
    return (
      <div className={`metric-status ${className}`}>
        <div className="icon">
          {iconSymbol}
        </div>
        <div className="content">
          <div className="big-number">
            <span className="number">{this.props.metric}</span>
            %
          </div>
          <div className="context">
            <T k={this.props.title} /> - {this.props.total}
          </div>
        </div>
      </div>
    );
  },
});

module.exports = MetricStatus;
