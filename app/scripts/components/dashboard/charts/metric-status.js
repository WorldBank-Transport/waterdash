import React from 'react';
import classNames from 'classnames';
import T from '../../misc/t';

require('stylesheets/dashboard/charts/metric-status');

const MetricStatus = React.createClass({
  propTypes: {
    metric: React.PropTypes.number.isRequired,
    title: React.PropTypes.string.isRequired,
    total: React.PropTypes.number.isRequired,
  },

  render() {
    const classes = classNames({
      'icon': true,
      'good': true, // some conditions
      'medium': false,
      'poor': false,
    });
    return (
      <div className="metric-chart">
        <div className="row">
          <div className={classes}>icon</div>
          <div className="big-number-metric">{this.props.metric} %</div>
        </div>
        <div className="row">
          <span><T k={this.props.title} /> - {this.props.total}</span>
        </div>
      </div>
    );
  },
});

module.exports = MetricStatus;
