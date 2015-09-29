import React, { PropTypes } from 'react';
import T from '../misc/t';

require('stylesheets/filters/filter');

const Filters = React.createClass({
  propTypes: {
    children: PropTypes.node.isRequired,
    name: PropTypes.string.isRequired,
  },
  getInitialState() {
    return {
      open: false,
    };
  },
  toggle(e) {
    e.preventDefault();
    this.replaceState({open: !this.state.open});
  },
  render() {
    return (
      <div className={`filter ${this.state.open ? 'open' : 'closed'}`}>
        <a
            className="filter-title"
            href="#"
            onClick={this.toggle}
            role="button">
          <h3><T k={this.props.name} /></h3>
        </a>
        <div className="filter-body">
          {this.props.children}
        </div>
      </div>
    );
  },
});

export default Filters;
