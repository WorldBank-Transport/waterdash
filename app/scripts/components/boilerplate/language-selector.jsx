'use strict';

import React, {Component} from 'react';
import T from '../utils/t.jsx';

require('stylesheets/boilerplate/language-selector.scss');

export default class LanguageSelector extends Component {
  render() {
    return (
      <ul className="language-selector">
        <li><T k="lang.en" /></li>
        <li><T k="lang.sw-tz" /></li>
      </ul>
    );
  }
}
