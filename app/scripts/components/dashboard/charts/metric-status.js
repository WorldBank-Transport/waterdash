import React from 'react';
import classNames from 'classnames';
import T from '../../misc/t';

require('stylesheets/dashboard/charts/metric-status');

const MetricStatus = React.createClass({
  propTypes: {
    metric: React.PropTypes.string.isRequired,
    sumProps: React.PropTypes.object.isRequired,
    title: React.PropTypes.string.isRequired,
  },

  render() {
    const classes = classNames({
      'icon': true,
      'good': false, // some conditions
      'medium': false,
      'poor': false,
    });
    if (this.props.sumProps.total > 0) {
      const percent = (this.props.sumProps[this.props.metric] / this.props.sumProps.total * 100).toFixed(2);
      return (
        <div className="metric-chart">
          <div className="row">
            <div className={classes}>icon</div>
            <div className="big-number-metric">{percent} %</div>
          </div>
          <div className="row">
            <span><T k={this.props.title} /> - {this.props.sumProps[this.props.metric]}</span>
          </div>
        </div>
      );
    } else {
      return false;
    }
  },
});

module.exports = MetricStatus;
