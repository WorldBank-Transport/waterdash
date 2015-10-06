import React from 'react';
import T from '../misc/t';
import TChildProps from '../misc/t-set-child-props';

require('stylesheets/boilerplate/logo');

const Logo = React.createClass({
  render() {
    return (
      <div className="logo">
        <TChildProps>
          <img alt={{k: 'site.flag'}} src="images/tz-flag.png"/>
        </TChildProps>
        <h1><T k="site-name" /></h1>
      </div>
    );
  },
});

export default Logo;
