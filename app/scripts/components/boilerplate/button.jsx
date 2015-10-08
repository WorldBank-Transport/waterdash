import React from 'react';
import {Link} from 'react-router';

require('stylesheets/boilerplate/button');

const Button = React.createClass({
  render() {
    return (
      <div>
        <Link className="button-link" to={`/waterpoints/`}>water points</Link>
      </div>
    );
  },
});

export default Button;
