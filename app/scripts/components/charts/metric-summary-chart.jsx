import React, { PropTypes } from 'react';
import T from '../misc/t';
import { Icon } from 'react-font-awesome';
import { getNumberOr0 } from '../../utils/number';
import ShouldRenderMixin from '../../utils/should-render-mixin';
import { FormattedNumber } from 'react-intl';

require('stylesheets/charts/metric-summary-chart');

const MetricSummary = React.createClass({
  propTypes: {
    format: PropTypes.func,
    icons: PropTypes.object,
    metric: PropTypes.object.isRequired,
    showPercentage: PropTypes.bool,
    title: PropTypes.string.isRequired,
  },

  mixins: [ShouldRenderMixin],

  render() {
    const metric = this.props.metric;
    const icons = this.props.icons ? this.props.icons : {};
    const summaryDiv = metric.values.map(item => {
      const value = this.props.format ? this.props.format(getNumberOr0(item.value)) : getNumberOr0(item.value);
      const icon = icons[item.name] ? (<Icon type={icons[item.name]}/>) : (<div />);
      const perc = this.props.showPercentage ? (<div className="medium-number"><span className="number">{(value / metric.total * 100).toFixed(2)}</span>%</div>) : (<div />);
      return (
        <div className="group-content">
          {icon}
          <div className="context">
            <T k={`chart.waterpoint.summary.${item.name}`} />
          </div>
          <div className="row">
          <span className="percent-value">{perc}</span>
            <div className="medium-number padding">
              <span className="number-value"><FormattedNumber value={value} /></span>
            </div>
          </div>
        </div>);
    });

    return (
      <div className="metric-summary">
        <h3 className="chart-title"><T k={this.props.title} /></h3>
        <div className="chart-helptext">% value represents percent of all waterpoints</div>
        <div className="summary chart-container">{summaryDiv}</div>

      </div>);
  },
});

module.exports = MetricSummary;
