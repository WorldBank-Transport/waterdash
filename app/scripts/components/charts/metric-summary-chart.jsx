import React, { PropTypes } from 'react';
import T from '../misc/t';
import isNumber from 'lodash/lang/isNumber';
import isNaN from 'lodash/lang/isNaN';
import { Icon } from 'react-font-awesome';

require('stylesheets/charts/metric-summary-chart');

const MetricSummary = React.createClass({
  propTypes: {
    metric: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    icons: PropTypes.object,
    showPercentage: PropTypes.bool,
  },

  getNumberValue(value) {
    return (isNumber(value) && !isNaN(value)) ? value : 0;
  },

  render() {
    const metric = this.props.metric;
    const icons = this.props.icons ? this.props.icons : {};
    const summaryDiv = metric.values.map(item => {
      const value = this.getNumberValue(item.value);
      const icon = icons[item.name] ? (<Icon type={icons[item.name]}/>) : (<div />);
      const perc = this.props.showPercentage ? (<div className="medium-number"> - <span className="number">{(value/metric.total*100).toFixed(2)}</span>%</div>) : (<div />);
      return (
        <div className="group-content">
          {icon}
          <div className="context">
            <T k={`chart.waterpoint.summary.${item.name}`} />
          </div>
          <div className="row">
            <div className="medium-number">
              <span className="number">{value}</span>
            </div>
            {perc}
          </div>
        </div>);
    });
    
    return (
      <div className="metric-summary">
        <h3 className="chart-title"><T k={this.props.title} /></h3>
        <div className="summary chart-container">{summaryDiv}</div>
      </div>);
  },
});

module.exports = MetricSummary;
