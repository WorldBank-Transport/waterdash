import React from 'react';
import T from 'components/utils/t';

require('stylesheets/boilerplate/language-selector');

const LanguageSelector = React.createClass({
  render() {
    return (
      <ul className="language-selector">
        <li><T k="lang.en" /></li>
        <li><T k="lang.sw-tz" /></li>
      </ul>
    );
  },
});

export default LanguageSelector;
