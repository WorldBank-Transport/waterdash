import React from 'react';
import classNames from 'classnames';
import T from '../utils/t';

require('stylesheets/boilerplate/language-selector');

const LanguageSelector = React.createClass({
  getInitialState() {
    return {lang: 'en', langList: ['en', 'sw-tz']};
  },

  handleClick(lang) {
    // TODO to be implemented
  },

  render() {
    return (
      <ul className="language-selector">
        {this.state.langList.map(function(item, index) {
          const classes = classNames({
            'language-selector': true,
            'active': this.state.lang === item,
          });
          return <li className={classes}  key={index} onClick={this.handleClick.bind(this, item)}><T k={`lang.${item}`} /></li>;
        }, this)}
      </ul>
    );
  },
});

export default LanguageSelector;
