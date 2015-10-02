import isUndefined from 'lodash/lang/isUndefined';
import isFunction from 'lodash/lang/isFunction';
import isArray from 'lodash/lang/isArray';
import React from 'react';
import warn from '../../utils/warn';
import { connect } from 'reflux';
import langStore from '../../stores/lang';


const allTranslations = {
  'en': {
    'site-name': 'Water Dashboard',
    'site.flag': 'Flag of Tanzania',

    'nav.home': 'Home',
    'nav.data': 'Data',
    'nav.speak-out': 'Speak Out',

    'lang.en': 'English',
    'lang.sw-tz': 'Kiswahili',

    'filters.title': 'Filters',

    'dash.waterpoints': 'Water Points',
    'dash.waterpoint': 'A Water Point',
    'dash.region': 'Regions',
    'dash.district': 'Districts',
    'dash.ward': 'Wards',

    'charts.toggle.activate': 'View Charts',
    'chart.title.functional': 'Functional',

    'view-mode.points': 'All Water Points',
    'view-mode.region': 'Region',
    'view-mode.district': 'District',
    'view-mode.ward': 'Ward',

    'footer.copy': 'The content of this website is published under a CC BY NC SA 3.0 license, and the source code is published under a GPL 3.0 license. Visitors are encouraged to examine and re-use the code as long as they publish it under a similar license.',

    'error': 'We\'re sorry',
    'error.retry': 'Retry',
    'error.api.pre-request': 'An error occurred when the application was preparing to fetch data',
    'error.api.http': 'A network error occurred while trying to fetch data',
    'error.api.http.not-ok': 'A server error occurred while trying to fetch data',
    'error.api.ckan': 'The CKAN data server encountered an error while trying to fetch data',
    'error.api.ckan.unknown-field-type': i => `The CKAN data server returned data of an unknown type '${i[0]}' for field '${i[1]}'`,
    'error.api.ckan.record-missing-field': i => `A record from the CKAN data server was missing the field '${i[0]}'`,

  },

  'sw-tz': {
  },
};


/**
 * @param {string} lang The language to translate to like 'en'
 * @param {string} k The key for the translation, like 'site.name'
 * @param {array<any>} i Any values to interpolate into the string
 * @returns {string} the translated string, or the key if it's missing
 */
function translate(lang, k, i) {
  let translated = allTranslations[lang][k];
  if (isUndefined(translated)) {
    warn(`missing translation for key: ${k}`);
    translated = k;
  } else if (isFunction(translated)) {
    if (!isArray(i)) {
      warn(`missing expected array for interpolating ${k}, got: ${i}`);
      translated = translated([]);
    } else {
      translated = translated(i);
    }
  }
  return translated;
}


const T = React.createClass({
  propTypes: {
    i: React.PropTypes.array,
    k: React.PropTypes.string.isRequired,
  },
  mixins: [
    connect(langStore, 'lang'),
  ],
  render() {
    const translated = translate(this.state.lang, this.props.k, this.props.i);
    return (
      <span className="t">{translated}</span>
    );
  },
});

export { translate };
export default T;
