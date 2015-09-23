import React from 'react';
import classNames from 'classnames';
import T from '../../utils/t';

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
      'green': false, // some conditions
      'yellow': false,
      'red': false,
    });
    return (
      <div>
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
