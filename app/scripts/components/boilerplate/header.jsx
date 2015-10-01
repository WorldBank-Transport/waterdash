import React from 'react';
import T from '../misc/t';
import OpenDataNav from './open-data-nav';
import LanguageSelector from './language-selector';

require('stylesheets/boilerplate/header');

const Header = React.createClass({
  render() {
    return (
      <div className="header">
        <div className="logo">
          <img src="images/tz-flag.png"/>
        </div>
        <h1><T k="site-name" /></h1>
        <div className="header-nav">
          <OpenDataNav />
          <LanguageSelector />
        </div>
      </div>
    );
  },
});

export default Header;
