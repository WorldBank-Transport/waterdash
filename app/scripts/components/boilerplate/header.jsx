'use strict';

import React from 'react';
import T from '../utils/t.jsx';
import OpenDataNav from './open-data-nav.jsx';
import LanguageSelector from './language-selector.jsx';

require('stylesheets/boilerplate/header.scss');

const Header = React.createClass({
  render() {
    return (
      <div className="header">
        <div className="logo">
          <h1><T k="site-name" /></h1>
        </div>
        <div className="header-nav">
          <OpenDataNav />
          <LanguageSelector />
        </div>
      </div>
    );
  }
});

export default Header;
