import React from 'react';
import classNames from 'classnames';
import T from '../misc/t';

require('stylesheets/boilerplate/language-selector');

const LanguageSelector = React.createClass({
  getInitialState() {
    return {lang: 'en', langList: ['en', 'sw-tz']};
  },

  render() {
    return (
      <ul className="language-selector">
        {this.state.langList.map((item, index) => {
          const classes = classNames({
            'language-selector': true,
            'active': this.state.lang === item,
          });
          return <li className={classes}  key={index}><T k={`lang.${item}`} /></li>;
        }, this)}
      </ul>
    );
  },
});

export default LanguageSelector;
