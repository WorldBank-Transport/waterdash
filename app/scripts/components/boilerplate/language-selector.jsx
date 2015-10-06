import React from 'react';
import classNames from 'classnames';
import { connect } from 'reflux';
import langStore from '../../stores/lang';
import setLanguage from '../../actions/lang';
import T from '../misc/t';

require('stylesheets/boilerplate/language-selector');

const LanguageSelector = React.createClass({
  mixins: [
    connect(langStore, 'lang'),
  ],

  selectLanguage(e) {
    e.preventDefault();
    const langKey = e.currentTarget.dataset.lang;
    setLanguage(langKey);
  },

  langKeys: ['en', 'sw-tz'],

  render() {
    return (
      <ul className="language-selector">
        {this.langKeys.map(k => (
          <li className={classNames({active: this.state.lang === k})} key={k}>
            <a data-lang={k} href="#" onClick={this.selectLanguage}>
              <T k={`lang.${k}`} />
            </a>
          </li>
        ))}
      </ul>
    );
  },
});

export default LanguageSelector;
