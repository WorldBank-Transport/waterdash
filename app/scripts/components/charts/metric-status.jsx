import React, { PropTypes } from 'react';
import T from '../misc/t';
import isNumber from 'lodash/lang/isNumber';
import isNaN from 'lodash/lang/isNaN';
import { Icon } from 'react-font-awesome';
import {FormattedNumber, IntlMixin} from 'react-intl';

require('stylesheets/charts/metric-status');

const MetricStatus = React.createClass({
  propTypes: {
    className: PropTypes.string.isRequired,
    grouped: PropTypes.bool,
    iconSymbol: PropTypes.string.isRequired,
    metric: PropTypes.string.isRequired,
    select: PropTypes.func,
    sumProps: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
  },

  mixins: [IntlMixin],

  getDefaultProps() {
    return {
      select: () => null,
    };
  },

  getInitialState() {
    return {open: false};
  },

  toggle() {
    const newState = {
      ...this.state,
      open: !this.state.open,
    };
    this.replaceState(newState);
  },

  getNumberValue(value) {
    return (isNumber(value) && !isNaN(value)) ? value : 0.0;
  },

  renderGrouped(total) {
    if (!this.props.grouped) {
      return '';
    }
    const values = this.props.sumProps;
    const metric = this.props.metric;
    const groupedDiv = Object.keys(values).map(key => {
      if (key.startsWith(metric)) {
        const value = this.getNumberValue(values[key]);
        return (
          <div className="group-content" key={key} >
            <div className="medium-number">
              <span className="number"><FormattedNumber minimumFractionDigits="2" style="percent" value={(value / total)}/></span>
            </div>
            <div className="context">
              <T k={`chart.title.${key}`} /> - <FormattedNumber value={value} />
            </div>
          </div>);
      }
    });
    const [visibleClass, direction] = this.state.open ? [ 'visible',  'down']  : ['hidden', 'up'];
    return (
      <div className="non-functional-toggle">
        <Icon onClick={this.toggle} type={`chevron-circle-${direction}`}/>
        <div className={`grouped ${visibleClass}`}>{groupedDiv}</div>
      </div>);
  },

  render() {
    const className = this.props.className;
    const iconSymbol = this.props.iconSymbol;
    let value = 0;
    const total = (isNumber(this.props.sumProps.total) && !isNaN(this.props.sumProps.total)) ? this.props.sumProps.total : 1;
    if (this.props.sumProps.total > 0) {
      if (this.props.grouped) {
        const values = this.props.sumProps;
        const metric = this.props.metric;
        value = Object.keys(values).reduce((ret, key) => {
          if (key.startsWith(metric)) {
            ret.value = ret.value + this.getNumberValue(values[key]);
          }
          return ret;
        }, {value: 0}).value;
      } else {
        value = this.getNumberValue(this.props.sumProps[this.props.metric]);
      }
    }
    return (
      <div className={`metric-status ${className}`}>
        <div className="icon" onClick={this.props.select} style={{cursor: 'pointer'}}>
          {iconSymbol}
        </div>
        <div className="content">
          <div className="big-number">
            <span className="number"><FormattedNumber minimumFractionDigits="2" style="percent" value={(value / total)}/></span>
          </div>
          <div className="context">
            <T k={this.props.title} /> - <FormattedNumber value={value} />
          </div>
        </div>
        {this.renderGrouped(total)}
      </div>
    );
  },
});

module.exports = MetricStatus;
