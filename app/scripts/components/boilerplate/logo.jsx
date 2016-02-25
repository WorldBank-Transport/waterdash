import React from 'react';
import { Link } from 'react-router';
import T from '../misc/t';
import TChildProps from '../misc/t-set-child-props';

require('stylesheets/boilerplate/logo');

const Logo = React.createClass({
  render() {
    return (
      <div className="logo">
        <Link to="/">
          <TChildProps>
            <img title={{k: 'site.flag'}} alt={{k: 'site.flag'}} src="images/tz-flag.png"/>
          </TChildProps>
        </Link>
        <h1>
          <Link to="/">
            <T k="site-name" />
          </Link>
        </h1>
      </div>
    );
  },
});

export default Logo;
