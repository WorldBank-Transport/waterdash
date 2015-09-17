'use strict';

import React, {Component} from 'react';
import T from '../utils/t.jsx';
import OpenDataNav from './open-data-nav.jsx';
import LanguageSelector from './language-selector.jsx';

require('stylesheets/boilerplate/header.scss');

export default class Header extends Component {
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
}
