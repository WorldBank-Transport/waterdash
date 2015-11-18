import React, { PropTypes } from 'react';
import Checkbox from '../misc/checkbox';

require('stylesheets/charts/waterpoint-status-options');

const WaterpointStatusOptions = React.createClass({
  propTypes: {
    onclick: PropTypes.func,
    state: PropTypes.object,
    values: PropTypes.array.require,
  },

  getDefaultProps: function() {
    return {
      state: {},
      values: [],
    };
  },

  render() {
    const items = this.props.values.map(key => {
      return (<li className={key}><Checkbox checked={this.props.state[key]} label={`chart.option.${key}`} action={e => this.props.onclick(e, key)}/></li>);
    });
    return (
      <div className="waterpoints-chart-options-container">
        <ul>
          {items}
        </ul>
      </div>
    );
  },
});
export default WaterpointStatusOptions;
