import React from 'react';
import T from '../misc/t';

require('stylesheets/boilerplate/logo');

const Logo = React.createClass({
  render() {
    return (
      <div className="logo">
        <img src="images/tz-flag.png"/>
        <h1><T k="site-name" /></h1>
      </div>
    );
  },
});

export default Logo;
