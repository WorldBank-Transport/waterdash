import React from 'react';
import {Link} from 'react-router';

require('stylesheets/boilerplate/button');

const Button = React.createClass({
  propTypes: {
    children: React.PropTypes.node.isRequired,
    linkTo: React.PropTypes.string.isRequired,
  },
  render() {
    return (
      <div className="button">
        <Link to={this.props.linkTo}>
          {this.props.children}
        </Link>
      </div>
    );
  },
});
export default Button;
