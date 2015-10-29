import React from 'react';
import T from '../misc/t';

require('stylesheets/charts/metric-status');

const MetricStatus = React.createClass({
  propTypes: {
    metric: React.PropTypes.string.isRequired,
    sumProps: React.PropTypes.object.isRequired,
    title: React.PropTypes.string.isRequired,
  },

  render() {
    let className, iconSymbol;
    if (this.props.metric === 'FUNCTIONAL') {  // some condition
      className = 'good';
      iconSymbol = '✓';
    } else if (this.props.metric === 'FUNCTIONAL NEEDS REPAIR') {
      className = 'medium';
      iconSymbol = '-';
    } else {
      className = 'poor';
      iconSymbol = '×';
    }
    if (this.props.sumProps.total > 0) {
      const percent = (this.props.sumProps[this.props.metric] / this.props.sumProps.total * 100).toFixed(2);
      return (
      <div className={`metric-status ${className}`}>
        <div className="icon">
          {iconSymbol}
        </div>
        <div className="content">
          <div className="big-number">
            <span className="number">{percent}</span>
            %
          </div>
          <div className="context">
            <T k={this.props.title} /> - {this.props.sumProps[this.props.metric]}
          </div>
        </div>
      </div>
      );
    } else {
      return false;
    }
  },
});

module.exports = MetricStatus;
