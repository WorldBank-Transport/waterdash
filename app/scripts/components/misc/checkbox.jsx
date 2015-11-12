import React, { PropTypes } from 'react';
import T from '../misc/t';
import isUndefined from 'lodash/lang/isUndefined';

require('stylesheets/boilerplate/checkbox');

const Checkbox = React.createClass({
  propTypes: {
    action: PropTypes.func.isRequired,
    checked: PropTypes.bool.isRequired,
    label: PropTypes.string,
  },

  render() {
    const label = isUndefined(this.props.label) ? '' : (<T k={this.props.label} />);
    const selected = this.props.checked ? 'selected' : '';
    return (
      <div className="checkbox">
        <div className={`selectable ${selected}`} onClick={this.props.action}></div>
        {label}
      </div>
    );
  },
});

export default Checkbox;
