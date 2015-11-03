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

    'static.data-title': 'Explore the data behind the dashboard.',
    'static.data-content': 'This Water Dashboard was built on open data release by the government of Tanzania. The raw data is published on the Government\'s open data portal in machine-readable format with a license that encourages re-use. The data behind this education dashboard comes from Ministry of Water and the National Bureau of Statistics of Tanzania.',
    'static.speakout-title': 'Your voice matters!',
    'static.speakout-content': 'Complete this form to share feedback about the data.',

    'lang.en': 'English',
    'lang.sw-tz': 'Kiswahili',

    'filters.title': 'Dashboard Filters',
    'filters.population-served': 'Population Served',
    'filters.population-served.unit': 'Number of people',
    'filters.filter-two': 'Filter Two',
    'filters.filter-three': 'Filter Three',

    'dash.waterpoints': 'Water Points',
    'dash.waterpoint': 'A Water Point',
    'dash.region': 'Regions',
    'dash.district': 'Districts',
    'dash.ward': 'Wards',

    'charts.toggle.closed': 'View Charts',
    'charts.toggle.opened': 'Hide Charts',
    'chart.title.functional': 'Functional',
    'chart.title.non-functional': 'Non Functional',
    'chart.title.repair': 'Needs Repair',
    'chart.functional-waterpoints.title': 'Functional WaterPoints',
    'chart.functional-waterpoints.x-axis': 'Regions',
    'chart.functional-waterpoints.y-axis': '%',
    'chart.status-waterpoints.title': 'Waterpoint status',
    'chart.status-waterpoints.x-axis': 'Regions',
    'chart.status-waterpoints.y-axis': 'Status',
    'chart.title-waterpoints-status': 'Waterpoints Status',
    'chart.title-waterpoints-status-helptext': 'Ordered by % of Functional',
    'chart.title-waterpoints-functional': 'Performance Table',
    'chart.title-waterpoints-functional-helptext': '% Functional',
    'chart.title-boreholes-stats': 'Performance Table',
    'chart.title-boreholes-stats-helptext': '% Served',
    'chart.title-population-served': 'Population',
    'chart.title-title-population-served-helptext': 'People-Waterpoint ratio',
    'chart.waterpoints-people-ratio.x-axis': 'Regions',
    'chart.waterpoints-people-ratio.y-axis': 'Ratio',

    'chart.boreholes.title': 'Boreholes',
    'chart.boreholes.x-axis': 'Regions',
    'chart.boreholes.y-axis': '#',
    'chart.boreholes.DIAMETER': 'Diameter',
    'chart.boreholes.DEPTH_METER': 'Depth Meter',
    'chart.boreholes.STATIC_WATER_LEVEL': 'Static Water Level',
    'chart.boreholes.DYNAMIC_WATER_LEVEL_METER': 'Dynamic Water Level',
    'chart.boreholes.DRAW _DOWN_METER': 'Draw Down Meter',
    'chart.boreholes.YIELD_METER_CUBED_PER_HOUR': 'Yield meter cubed per hour',
    'chart.boreholes-stats.x-axis': 'Years',
    'chart.boreholes-stats.y-axis': '#',
    'charts.category.filter.title': 'Choose a Subcategory',
    'charts.sub-category.HARDWARE_PROBLEM': 'Hardware Problem',
    'charts.sub-category.WATER_QUALITY': 'Water Quality',
    'charts.sub-category.WATER_QUANTITY': 'Water Quantity',
    'charts.sub-category.SOURCE_TYPE': 'Source Type',
    'charts.sub-category.value.PUMP STOLEN': 'PUMP STOLEN',
    'charts.sub-category.value.UNDER CONSTRUCTION': 'UNDER CONSTRUCTION',
    'charts.sub-category.value.PUMP BROKEN': 'PUMP BROKEN',
    'charts.sub-category.value.TAP BROKEN': 'TAP BROKEN',
    'charts.sub-category.value.SOURCE DAMAGED': 'SOURCE DAMAGED',
    'charts.sub-category.value.PIPE BROKEN': 'PIPE BROKEN',
    'charts.sub-category.value.TAP POORLY SITED': 'TAP POORLY SITED',
    'charts.sub-category.value.ENGINE STOLEN': 'ENGINE STOLEN',
    'charts.sub-category.value.ENGINE BROKEN': 'ENGINE BROKEN',
    'charts.sub-category.value.TANK OUT OF USE': 'TANK OUT OF USE',
    'charts.sub-category.value.MACHINE-DRILLED BOREHOLE': 'MACHINE-DRILLED BOREHOLE',
    'charts.sub-category.value.OTHER': 'OTHER',
    'charts.sub-category.value.SOFT': 'SOFT',
    'charts.sub-category.value.SALTY': 'SALTY',
    'charts.sub-category.value.UNKNOWN': 'UNKNOWN',
    'charts.sub-category.value.SALTY ABANDONED': 'SALTY ABANDONED',
    'charts.sub-category.value.COLOURED': 'COLOURED',
    'charts.sub-category.value.MILKY': 'MILKY',
    'charts.sub-category.value.FLUORIDE': 'FLUORIDE',
    'charts.sub-category.value.FLUORIDE ABANDONED': 'FLUORIDE ABANDONED',
    'charts.sub-category.value.GOOD': 'GOOD',
    'charts.sub-category.value.ENOUGH': 'ENOUGH',
    'charts.sub-category.value.INSUFFICIENT': 'INSUFFICIENT',
    'charts.sub-category.value.DRY': 'DRY',
    'charts.sub-category.value.SEASONAL': 'SEASONAL',
    'charts.sub-category.value.SHALLOW WELL': 'SHALLOW WELL',
    'charts.sub-category.value.MACHINE DBH': 'MACHINE DBH',
    'charts.sub-category.value.RIVER': 'RIVER',
    'charts.sub-category.value.RAINWATER HARVESTING': 'RAINWATER HARVESTING',
    'charts.sub-category.value.SPRING': 'SPRING',
    'charts.sub-category.value.DAM': 'DAM',
    'charts.sub-category.value.LAKE': 'LAKE',
    'charts.sub-category.value.HAND DTW': 'HAND DTW',
    'charts.sub-category.value.NONE': 'NONE',
    'charts.sub-category.all': 'Select All',

    'filters.toggle.closed': 'Dashboard Filters',
    'filters.toggle.opened': 'Hide Filters',

    'popup.close': 'Close popup',

    'view-mode.points.waterpoints': 'All Waterpoints',
    'view-mode.points.dams': 'All Dams',
    'view-mode.points.boreholes': 'All Boreholes',
    'view-mode.points': i => `All ${i[0]}`,
    'view-mode.region': 'Region',
    'view-mode.district': 'District',
    'view-mode.ward': 'Ward',
    'view-mode.disabled': 'Data not available',

    'data-type.waterpoints': 'Waterpoints',
    'data-type.boreholes': 'Boreholes',
    'data-type.dams': 'Dams',

    'overview-bar': 'Overview stuff',

    'footer.copy': 'The content of this website is published under a CC BY NC SA 3.0 license, and the source code is published under a GPL 3.0 license. Visitors are encouraged to examine and re-use the code as long as they publish it under a similar license.',

    'loading': 'Loading',
    'loading.waterpoints': i => `${i[0]} waterpoints loaded...`,
    'loading.boreholes': i => `${i[0]} boreholes loaded...`,
    'loading.dams': i => `${i[0]} dams loaded...`,
    'loading.regions': 'Loading regions...',
    'loading.districts': 'Loading districts...',
    'loading.wards': 'Loading wards...',
    'loading.points': 'If you see this message, there is likely an error in the application.',

    'popup.waterpoint.code': 'Code #',
    'popup.waterpoint.source-type': 'Water point Source Type',
    'popup.waterpoint.population-served': 'Population Served',
    'popup.waterpoint.hardware-problem': 'Water Point issue',
    'popup.waterpoint.quantity': 'Quantity',
    'popup.waterpoint.quality': 'Quality',
    'popup.waterpoint.location': 'Water Point Location',
    'popup.waterpoint.position': 'Lat Lon',
    'popup.waterpoint.region': 'Region',
    'popup.waterpoint.district': 'District',
    'popup.waterpoint.ward': 'Ward',

    'error': 'We\'re sorry',
    'error.retry': 'Retry',
    'error.api.pre-request': 'An error occurred when the application was preparing to fetch data',
    'error.api.http': 'A network error occurred while trying to fetch data',
    'error.api.http.not-ok': 'A server error occurred while trying to fetch data',
    'error.api.ckan': 'The CKAN data server encountered an error while trying to fetch data',
    'error.api.ckan.unknown-field-type': i => `The CKAN data server returned data of an unknown type '${i[0]}' for field '${i[1]}'`,
    'error.api.ckan.record-missing-field': i => `A record from the CKAN data server was missing the field '${i[0]}'`,
    'error.api.postprocess': 'An error occurred while the application was processing data',
    'error.api.static.postprocess': 'An error occurred while the application was procesing boundary data',

  },

  'sw-tz': {

    'nav.home': 'Mwanzo',
    'nav.data': 'Takwimu',
    'nav.speak-out': 'Maoni',

    'static.data-title': 'Chunguza data ya dashibodi',
    'static.data-content': 'Dashibodi ya maji imejengwa juu ya Takwimu Huria zilizoainishwa na Serikali ya Tanzania. Takwimu ghafi zilizoidhinishwa zimetangazwa kwa tovuti kuu ya  Serikaliopen data portal kwa njia inayosomeka na kompyuta ikitumia leseni  inayohamasisha matumizi kwa jumla. Takwimu zimetangazwa na Wizara ya Maji ya Tanzania, na Ofisi ya Taifa ya Takwimu.',
    'static.speakout-title': 'Sauti yako ni ya maana!',
    'static.speakout-content': 'Jaza fomu hii utupe maoni yako kuhusu takwimu zilizopo.',

    'view-mode.region': 'Mkoa',
    'view-mode.district': 'Wilaya',

    'chart.functional-waterpoints.title': 'puntos de agua funcionando',
    'chart.functional-waterpoints.x-axis': 'Regiones',
    'chart.functional-waterpoints.y-axis': 'porc',


  },
};


/**
 * @param {string} lang The language to translate to like 'en'
 * @param {string} k The key for the translation, like 'site.name'
 * @param {array<any>} i Any values to interpolate into the string
 * @returns {string} the translated string, or the key if it's missing
 */
function translate(lang, k, i) {
  const langTranslations = allTranslations[lang];
  if (isUndefined(langTranslations)) {
    // if the language key is bad, quit early
    warn(`missing language ${lang} to translate ${k}`);
    return k;
  }
  let translated = langTranslations[k];
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
