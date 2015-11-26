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

    'home.waterpoints': 'Waterpoints',
    'home.boreholes': 'Boreholes',
    'home.dams': 'Dams',

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
    'chart.title.elevation': 'Average Dams Elevation',
    'chart.title.height': 'Average Dams Height',
    'chart.title.reservoir': 'Water Reservoir in dams',
    'chart.title.NON FUNCTIONAL < 3M': 'Non Functional < 3M',
    'chart.title.NON FUNCTIONAL < 6M': 'Non Functional < 6M',
    'chart.title.NON FUNCTIONAL > 3M': 'Non Functional > 3M',
    'chart.title.NON FUNCTIONAL > 6M': 'Non Functional > 6M',
    'chart.title.NON FUNCTIONAL': 'Non Functional',
    'chart.functional-waterpoints.title': 'Functional WaterPoints',
    'chart.functional-waterpoints.x-axis-REGION': 'Regions',
    'chart.functional-waterpoints.x-axis-DISTRICT': 'District',
    'chart.functional-waterpoints.x-axis-WARD': 'Ward',
    'chart.functional-waterpoints.y-axis': '%',
    'chart.status-waterpoints.title': 'Waterpoint status',
    'chart.status-waterpoints.x-axis-REGION': 'Regions',
    'chart.status-waterpoints.x-axis-DISTRICT': 'Districts',
    'chart.status-waterpoints.x-axis-WARD': 'Wards',
    'chart.status-waterpoints.y-axis': 'Status',
    'chart.title-waterpoints-status': 'Waterpoints Status',
    'chart.title-waterpoints-status-helptext': 'Ordered by % of Functional',
    'chart.title-waterpoints-functional': 'Performance Table',
    'chart.title-waterpoints-functional-helptext': '% Functional',
    'chart.title-boreholes-stats': 'Metric Evolution',
    'chart.title-boreholes-stats-helptext': 'Average through the years',
    'chart.title-population-served': 'Population',
    'chart.title-title-population-served-helptext': 'People-Waterpoint ratio',
    'chart.title.number-boreholes': 'Total Number of Boreholes',
    'chart.waterpoints-people-ratio.x-axis-REGION': 'Regions',
    'chart.waterpoints-people-ratio.x-axis-DISTRICT': 'Districts',
    'chart.waterpoints-people-ratio.x-axis-WARD': 'Wards',
    'chart.waterpoints-people-ratio.y-axis': 'Ratio',

    'chart.boreholes.title': 'Boreholes',
    'chart.boreholes.x-axis': 'Regions',
    'chart.boreholes.y-axis': '#',
    'chart.option.DIAMETER': 'Diameter',
    'chart.option.DEPTH_METER': 'Depth Meter',
    'chart.option.STATIC_WATER_LEVEL': 'Static Level',
    'chart.option.DYNAMIC_WATER_LEVEL_METER': 'Dynamic Level',
    'chart.option.DRAW _DOWN_METER': 'Draw Down',
    'chart.option.YIELD_METER_CUBED_PER_HOUR': 'Yield cubed',
    'chart.boreholes-stats.x-axis': 'Years',
    'chart.boreholes-stats.y-axis': '#',
    'chart.boreholes.summary': 'Metrics summary',
    'chart.title-boreholes-metric.DIAMETER': 'Diameter',
    'chart.title-boreholes-metric-helptext.DIAMETER': 'Average size in Meters',
    'chart.title-boreholes-metric.DEPTH_METER': 'Depth',
    'chart.title-boreholes-metric-helptext.DEPTH_METER': 'Average Depth in Meters',
    'chart.title-boreholes-metric.STATIC_WATER_LEVEL': 'Static Water Level',
    'chart.title-boreholes-metric-helptext.STATIC_WATER_LEVEL': 'Average in Meters',
    'chart.title-boreholes-metric.DYNAMIC_WATER_LEVEL_METER': 'Dynamic Water Level',
    'chart.title-boreholes-metric-helptext.DYNAMIC_WATER_LEVEL_METER': 'Average in Meters',
    'chart.title-boreholes-metric.DRAW _DOWN_METER': 'Draw Down',
    'chart.title-boreholes-metric-helptext.DRAW _DOWN_METER': 'Average in Meters',
    'chart.title-boreholes-metric.YIELD_METER_CUBED_PER_HOUR': 'Yield Cubed',
    'chart.title-boreholes-metric-helptext.YIELD_METER_CUBED_PER_HOUR': 'Average meter per Hour',

    'chart.title-dams': 'Dams Status',
    'chart.title-dams-status-helptext': '',
    'chart.dams.x-axis': 'Regions',
    'chart.dams.y-axis': '#',

    'chart.option.DAM_HEIGHT': 'Height',
    'chart.option.ELEVATION_': 'Elevation',
    'chart.option.RESERVOIR_': 'Reservoir',
    'chart.option.FUNCTIONAL': 'Functional',
    'chart.option.FUNCTIONAL NEEDS REPAIR': 'Needs Repair',
    'chart.option.NON FUNCTIONAL': 'Non Functional',

    'charts.category.filter.title': 'Choose a Subcategory',
    'charts.sub-category.HARDWARE_PROBLEM': 'Hardware Problem',
    'charts.sub-category.WATER_QUALITY': 'Water Quality',
    'charts.sub-category.WATER_QUANTITY': 'Water Quantity',
    'charts.sub-category.SOURCE_TYPE': 'Source Type',
    'charts.sub-category.value.PUMP STOLEN': 'Pump Stolen',
    'charts.sub-category.value.UNDER CONSTRUCTION': 'Under Construction',
    'charts.sub-category.value.PUMP BROKEN': 'Pump Broken',
    'charts.sub-category.value.TAP BROKEN': 'Tap Broken',
    'charts.sub-category.value.SOURCE DAMAGED': 'Source Damaged',
    'charts.sub-category.value.PIPE BROKEN': 'Pipe Broken',
    'charts.sub-category.value.TAP POORLY SITED': 'Tap Poorly Sited',
    'charts.sub-category.value.ENGINE STOLEN': 'Engine Stolen',
    'charts.sub-category.value.ENGINE BROKEN': 'Engine Broken',
    'charts.sub-category.value.TANK OUT OF USE': 'Tank out of use',
    'charts.sub-category.value.MACHINE-DRILLED BOREHOLE': 'Machine-drilled Borehole',
    'charts.sub-category.value.OTHER': 'Other',
    'charts.sub-category.value.SOFT': 'Soft',
    'charts.sub-category.value.SALTY': 'Salty',
    'charts.sub-category.value.UNKNOWN': 'Unknown',
    'charts.sub-category.value.SALTY ABANDONED': 'Salty Abandonded',
    'charts.sub-category.value.COLOURED': 'Coloured',
    'charts.sub-category.value.MILKY': 'Milky',
    'charts.sub-category.value.FLUORIDE': 'Flouride',
    'charts.sub-category.value.FLUORIDE ABANDONED': 'Flouride Abandonded',
    'charts.sub-category.value.GOOD': 'Good',
    'charts.sub-category.value.ENOUGH': 'Enough',
    'charts.sub-category.value.INSUFFICIENT': 'Insufficient',
    'charts.sub-category.value.DRY': 'Dry',
    'charts.sub-category.value.SEASONAL': 'Seasonal',
    'charts.sub-category.value.SHALLOW WELL': 'Shallow Well',
    'charts.sub-category.value.MACHINE DBH': 'Machine DBH',
    'charts.sub-category.value.RIVER': 'River',
    'charts.sub-category.value.RAINWATER HARVESTING': 'Rainwater Harvesting',
    'charts.sub-category.value.SPRING': 'Spring',
    'charts.sub-category.value.DAM': 'Dam',
    'charts.sub-category.value.LAKE': 'Lake',
    'charts.sub-category.value.HAND DTW': 'Hand DTW',
    'charts.sub-category.value.NONE': 'None',
    'charts.sub-category.all': 'Select All/Deselect All',
    'charts.years.filter.title': 'Choose a Year',
    'charts.years.all': 'Select All/Deselect All',
    'charts.years.2009': '2009',
    'charts.years.2010': '2010',
    'charts.years.2011': '2011',
    'charts.years.2012': '2012',
    'charts.years.2013': '2013',
    'charts.years.2014': '2014',
    'chart.waterpoint.summary.top-problem': 'Top Problems Of Waterpoints',
    'chart.waterpoint.summary.water-quality': 'Water Quality',
    'chart.waterpoint.summary.water-quantity': 'Water Quantity',
    'chart.waterpoint.summary.source-type': 'Source Type',
    'chart.waterpoint.summary.HARDWARE_PROBLEM': 'Hardware Problem',
    'chart.waterpoint.summary.PUMP BROKEN': 'Pump Broken',
    'chart.waterpoint.summary.UNDER CONSTRUCTION': 'Under Construction',
    'chart.waterpoint.summary.TAP POORLY SITED': 'Tap Poorly Sited',
    'chart.waterpoint.summary.TAP BROKEN': 'Tap Broken',
    'chart.waterpoint.summary.SOURCE DAMAGED': 'Source Damaged',
    'chart.waterpoint.summary.PIPE BROKEN': 'Pipe Broken',
    'chart.waterpoint.summary.TANK OUT OF USE': 'Tank out of Use',
    'chart.waterpoint.summary.ENGINE BROKEN': 'Engine Broken',
    'chart.waterpoint.summary.PUMP STOLEN': 'Pump Stolen',
    'chart.waterpoint.summary.ENGINE STOLEN': 'Engine Stolen',
    'chart.waterpoint.summary.OTHER': 'Other',
    'chart.waterpoint.summary.DIAMETER': 'Avg Diameter',
    'chart.waterpoint.summary.DEPTH_METER': 'Avg Depth Meter',
    'chart.waterpoint.summary.STATIC_WATER_LEVEL': 'Avg Static Water Level',
    'chart.waterpoint.summary.DYNAMIC_WATER_LEVEL_METER': 'Avg Dinamic Water Level',
    'chart.waterpoint.summary.DRAW _DOWN_METER': 'Avg Draw Down Meter',
    'chart.waterpoint.summary.YIELD_METER_CUBED_PER_HOUR': 'Avg Meter Cubed per Hour',
    'chart.waterpoint.summary.SOFT': 'Soft',
    'chart.waterpoint.summary.SALTY': 'Salty',
    'chart.waterpoint.summary.UNKNOWN': 'Unknown',
    'chart.waterpoint.summary.SALTY ABANDONED': 'Salty Abandonded',
    'chart.waterpoint.summary.COLOURED': 'Coloured',
    'chart.waterpoint.summary.MILKY': 'Milky',
    'chart.waterpoint.summary.FLUORIDE': 'Flouride',
    'chart.waterpoint.summary.FLUORIDE ABANDONED': 'Flouride Abandonded',
    'chart.waterpoint.summary.GOOD': 'Good',
    'chart.waterpoint.summary.ENOUGH': 'Enough',
    'chart.waterpoint.summary.INSUFFICIENT': 'Insufficient',
    'chart.waterpoint.summary.DRY': 'Dry',
    'chart.waterpoint.summary.SEASONAL': 'Seasonal',
    'chart.waterpoint.summary.SHALLOW WELL': 'Shallow Well',
    'chart.waterpoint.summary.MACHINE DBH': 'Machine DBH',
    'chart.waterpoint.summary.RIVER': 'River',
    'chart.waterpoint.summary.RAINWATER HARVESTING': 'Rainwater Harvesting',
    'chart.waterpoint.summary.SPRING': 'Spring',
    'chart.waterpoint.summary.DAM': 'Dam',
    'chart.waterpoint.summary.LAKE': 'Lake',
    'chart.waterpoint.summary.HAND DTW': 'Hand DTW',
    'chart.waterpoint.summary.NONE': 'None',
    'chart.waterpoint.summary.MACHINE-DRILLED BOREHOLE': 'Machine-drilled Borehole',
    'chart.pie.WATER_QUALITY': 'Water Quality',
    'chart.pie.WATER_QUANTITY': 'Water Quantity',
    'chart.pie.SOURCE_TYPE': 'Source Type',


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
    'popup.poly.REGION': 'Region',
    'popup.poly.DISTRICT': 'District',
    'popup.poly.WARD': 'Ward',
    'popup.waterpoint-poly.population-waterpoint-ratio': 'Population to Waterpoint Ratio',
    'popup.waterpoint-poly.waterpoints': 'Number of Waterpoints',
    'popup.waterpoint-poly.top-problem': 'Top Problem',
    'popup.borehole.quantity': 'Number of Boreholes',
    'popup.borehole.DIAMETER': 'Average Diameter',
    'popup.borehole.DEPTH_METER': 'Average Depth',
    'popup.borehole.STATIC_WATER_LEVEL': 'Average Static Water Level',
    'popup.borehole.DYNAMIC_WATER_LEVEL_METER': 'Average Dynamic Water Level',
    'popup.borehole.DRAW _DOWN_METER': 'Average Draw Down',
    'popup.borehole.YIELD_METER_CUBED_PER_HOUR': 'Total Yield meters cubed per hour',
    'popup.dam.name': 'Dam Name',
    'popup.dam.basin': 'Basin',
    'popup.dam.elevation': 'Elevation',
    'popup.dam.height': 'Height',
    'popup.dam.reservoir': 'Reservoir',
    'popup.dam.position': 'Lat/Lon',
    'popup.dam.region': 'Region',
    'popup.dam.district': 'District',
    'popup.dams-poly.quantity': 'Number of Dams',
    'popup.dams-poly.basin': 'Top Basin',

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
    'chart.functional-waterpoints.x-axis-REGION': 'Regions',
    'chart.functional-waterpoints.x-axis-DISTRICT': 'District',
    'chart.functional-waterpoints.x-axis-WARD': 'Ward',
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
