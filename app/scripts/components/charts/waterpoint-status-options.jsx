import React, { PropTypes } from 'react';
import IconChart from '../boilerplate/icon-check';
import T from '../misc/t';

require('stylesheets/charts/waterpoint-status-options');

const WaterpointStatusOptions = React.createClass({
  propTypes: {
    values: PropTypes.array.require,
    onclick: PropTypes.func,
  },

  render() {
    const items = this.props.values.map(key => {
      return (<li className={key}><IconChart /><T k={`chart.option.${key}`} /></li>);
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
