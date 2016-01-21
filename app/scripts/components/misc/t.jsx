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

    'home.title': 'Locate water projects throughout the country, your region, your district, or your ward. Use the Water Dashboard to examine water resources to make a difference in your community',
    'home.waterpoints': 'Waterpoints',
    'home.boreholes': 'Boreholes',
    'home.dams': 'Dams',
    'home.text': 'This Water Dashboard visualizes key information from Tanzania\'s open data portal. You can also use the menu options above to see original data and speak out about missing or wrong data.',

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
    'filters.DIAMETER': 'Diameter',
    'filters.DEPTH_METER': 'Depth',
    'filters.STATIC_WATER_LEVEL': 'Static Level',
    'filters.DYNAMIC_WATER_LEVEL_METER': 'Dynamic Level',
    'filters.DRAW _DOWN_METER': 'Draw Down',
    'filters.YIELD_METER_CUBED_PER_HOUR': 'Yield Cubed per Hour',
    'filters.DAM_HEIGHT': 'Height',
    'filters.ELEVATION_': 'Elevation',
    'filters.RESERVOIR_': 'Reservoir',

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
    'chart.doubleClick.help': 'double click on any bar to drilldown',
    'chart.click.help': 'Click on any bar to drilldown',
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
    'chart.title-title-population-served-helptext': 'People-Waterpoint Ratio',
    'chart.title.number-boreholes': 'Total Number of Boreholes',
    'chart.waterpoints-people-ratio.x-axis-REGION': 'Regions',
    'chart.waterpoints-people-ratio.x-axis-DISTRICT': 'Districts',
    'chart.waterpoints-people-ratio.x-axis-WARD': 'Wards',
    'chart.waterpoints-people-ratio.y-axis': 'Ratio',
    'chart.tooltip.title.REGION': 'Region',
    'chart.tooltip.title.DISTRICT': 'District',
    'chart.tooltip.title.WARD': 'Ward',
    'chart.tooltip.sufix.population-served': 'people per waterpoint',

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
    'chart.borehole-size.title': 'Boreholes Size',
    'chart.borehole-level.title': 'Boreholes Level',
    'chart.borehole-draw.title': 'Boreholes Draw Down',
    'chart.borehole-yield.title': 'Boreholes Yield Meter Cubed Per Hour',

    'chart.title-dams': 'Dams Status',
    'chart.title-dams-status-helptext': 'by Region',
    'chart.dams.x-axis': 'Regions',
    'chart.dams.y-axis': '#',

    'chart.option.DAM_HEIGHT': 'Height',
    'chart.option.ELEVATION_': 'Elevation',
    'chart.option.RESERVOIR_': 'Reservoir',
    'chart.option.FUNCTIONAL': 'Functional',
    'chart.option.FUNCTIONAL NEEDS REPAIR': 'Needs Repair',
    'chart.option.NON FUNCTIONAL': 'Non Functional',
    'chart.option.COLOURED': 'Coloured',
    'chart.option.FLUORIDE': 'Flouride',
    'chart.option.FLUORIDE ABANDONED': 'Flouride Abandonded',
    'chart.option.GOOD': 'Good',
    'chart.option.MILKY': 'Milky',
    'chart.option.SALTY': 'Salty',
    'chart.option.SALTY ABANDONED': 'Salty Abandonded',
    'chart.option.SOFT': 'Soft',
    'chart.option.UNKNOWN': 'Unknown',
    'chart.option.DRY': 'Dry',
    'chart.option.ENOUGH': 'Enough',
    'chart.option.INSUFFICIENT': 'Insufficient',
    'chart.option.OTHER': 'Oher',
    'chart.option.SEASONAL': 'Seasonal',
    'chart.option.DAM': 'Dam',
    'chart.option.HAND DTW': 'Hand DTW',
    'chart.option.LAKE': 'Lake',
    'chart.option.MACHINE DBH': 'Machine DBH',
    'chart.option.MACHINE-DRILLED BOREHOLE': 'Machine-drilled Borehole',
    'chart.option.RAINWATER HARVESTING': 'Rainwater Harvesting',
    'chart.option.RIVER': 'River',
    'chart.option.SHALLOW WELL': 'Shallow Well',
    'chart.option.SPRING': 'Spring',

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
    'chart.waterpoint.summary.DIAMETER': 'Average Diameter',
    'chart.waterpoint.summary.DEPTH_METER': 'Average Depth Meter',
    'chart.waterpoint.summary.STATIC_WATER_LEVEL': 'Average Static Water Level',
    'chart.waterpoint.summary.DYNAMIC_WATER_LEVEL_METER': 'Average Dynamic Water Level',
    'chart.waterpoint.summary.DRAW _DOWN_METER': 'Average Draw Down Meter',
    'chart.waterpoint.summary.YIELD_METER_CUBED_PER_HOUR': 'Average Meter Cubed per Hour',
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
    'chart.grouped': 'Grouped Bar Chart',
    'chart.waterpoint-total-servedpopulation': 'Total Served Population',
    'chart.waterpoint-total-servedpopulation.percenatge': 'Percentage',
    'chart.waterpoint-total-servedpopulation-helptext': 'Percentage Of Population Served By Year',
    'chart.tooltip.totalserved.title': 'Served Population ',
    'chart.tooltip.totalserved.xaxis': 'Population Served in %',
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
    'share.share': 'Share',
    'share.feedback': 'Feedback',
    'share.print': 'Print',


    'footer.copy': 'The source code of this website is published under a under a CC BY NC SA 3.0 license, and the source code is published under a GPL 3.0 license. Visitors are encouraged to examine and re-use the code as long as they publish it under a similar license.',

    'loading': 'Loading',
    'loading.waterpoints': 'Loading waterpoints...',
    'loading.boreholes': 'Loading boreholes...',
    'loading.dams': 'Loading dams...',
    'loading.regions': 'Loading regions...',
    'loading.districts': 'Loading districts...',
    'loading.wards': 'Loading wards...',
    'loading.points': 'If you see this message, there is likely an error in the application.',
    'popup.waterpoint.code': 'Code #',
    'popup.waterpoint.source-type': 'Water point Source Type',
    'popup.waterpoint.population-served': 'Population Served',
    'popup.waterpoint.hardware-problem': 'Waterpoint issue',
    'popup.waterpoint.quantity': 'Water Quantity',
    'popup.waterpoint.quality': 'Water Quality',
    'popup.waterpoint.location': 'Waterpoint Location',
    'popup.waterpoint.position': 'Location',
    'popup.waterpoint.region': 'Region',
    'popup.waterpoint.district': 'District',
    'popup.waterpoint.ward': 'Ward',
    'popup.waterpoint.status-group': 'Status Group',
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

    'legend.title': 'legend',
    'legend.lessthan50': '< 50',
    'legend.greaterhan50': '> 50',
    'legend.greaterhan75': '> 75',
    'legend.nodata': 'No Data',
    'legend.FUNCTIONAL': '% Functional',
    'legend.FUNCTIONAL NEEDS REPAIR': '% Needs Repair',
    'legend.NON FUNCTIONAL': '% Non Functional',
    'legend.UNKNOWN': '% Unknown',
    'legend.points': 'Number of points',
    'legend.simple-points': 'Dam',

    'drilldown.regions': 'Region',
    'drilldown.districts': 'District',
    'drilldown.wards': 'Ward',
    'drilldown.points': 'Point',
    'drilldown.back': 'Back To National',

    'search.field.WATER_POINT_CODE': 'Water Point Code',
    'search.field.WATER_POINT_NAME': 'Water Point Name',
    'search.field.BOREHOLE_NO': 'Borehole Number',
    'search.field.DAM_NAME': 'Dam Name',
    'search.field.REGION': 'Region',
    'search.field.DISTRICT': 'District',
    'search.field.WARD': 'Ward',
    'search.field.BASIN': 'Basin',
    'search.button': 'Search',

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
    'site-name': 'Water Dashboard',
    'site.flag': 'Flag of Tanzania',
    'home.title': 'Chunguza miradi ya maji katika taifa, mikoa, wilaya au kata. Tumia Dashibodi ya Maji kuchunguza ili kuleta mabadiliko katika jamii.',
    'home.waterpoints': 'Vituo vya maji safi na salama',
    'home.boreholes': 'Visima',
    'home.dams': 'Mabwawa',
    'home.text': 'Dashibodi hii ya maji ni tovuti ya takwimu huria zinazoorodhesha data katika sekta ya maji, ya kitaifa ya hivi karibuni na habari nyingine muhimu kwako. Tumia orodha iliyo juu kutazama takwimu asili na wasiliana nasi kuhusu takwimu zisizokuwepo au zenye makosa',

    'nav.home': 'Mwanzo',
    'nav.data': 'Data',
    'nav.speak-out': 'Maoni',

    'static.data-title': 'Chunguza data ya dashibodi.',
    'static.data-content': 'Dashibodi ya elimu imejengwa juu ya Takwimu Huria zilizoainishwa na Serikali ya Tanzania. Takwimu ghafi zimetangazwa kwa tovuti kuu ya Serikali kwa njia inayosomeka na kompyuta ikitumia leseni inayohamasisha matumizi kwa jumla. Takwimu zimetangazwa na Wizara ya Maji, na Ofisi ya Taifa ya Takwimu.',
    'static.speakout-title': 'Sauti yako ni ya maana!',
    'static.speakout-content': 'Jaza fomu hii utupe maoni yako kuhusu takwimu zilizopo.',

    'lang.en': 'English',
    'lang.sw-tz': 'Kiswahili',

    'filters.title': 'Kichujio cha Dashibodi',
    'filters.population-served': 'Idadi ya watu wanaotumikiwa',
    'filters.population-served.unit': 'Idadi ya watu',
    'filters.filter-two': 'Kichujio 2',
    'filters.filter-three': 'Kichujio 3',

    'dash.waterpoints': 'Vituo vya maji safi na salama',
    'dash.waterpoint': 'Kituo cha maji safi na salama',
    'dash.region': 'Mikoa',
    'dash.district': 'Wilaya',
    'dash.ward': 'Kata',

    'charts.toggle.closed': 'Tazama Chati',
    'charts.toggle.opened': 'Ficha Chati',
    'chart.doubleClick.help': 'Bonyeza chati mara mbili kuchunguza zaidi',
    'chart.title.functional': 'Kituo kinachofanya kazi',
    'chart.title.non-functional': 'Kituo hakifanyi kazi',
    'chart.title.repair': 'Kituo kinachohitaji kurekebishwa',
    'chart.title.elevation': 'Mwinuko wastani wa mabwawa',
    'chart.title.height': 'Urefu wastani wa mabwawa',
    'chart.title.reservoir': 'Kiasi cha maji yaliyohifadhiwa kwa mabwawa',
    'chart.title.NON FUNCTIONAL < 3M': 'Kituo hakifanyi kazi < 3M',
    'chart.title.NON FUNCTIONAL < 6M': 'Kituo hakifanyi kazi < 6M',
    'chart.title.NON FUNCTIONAL > 3M': 'Kituo hakifanyi kazi > 3M',
    'chart.title.NON FUNCTIONAL > 6M': 'Kituo hakifanyi kazi > 6M',
    'chart.title.NON FUNCTIONAL': 'Kituo hakifanyi kazi',
    'chart.functional-waterpoints.title': 'Vituo vya maji safi na salama vinavyofanya kazi',
    'chart.functional-waterpoints.x-axis-REGION': 'Mikoa',
    'chart.functional-waterpoints.x-axis-DISTRICT': 'Wilaya',
    'chart.functional-waterpoints.x-axis-WARD': 'Kata',
    'chart.functional-waterpoints.y-axis': '%',
    'chart.status-waterpoints.title': 'Hali ya Kituo cha maji',
    'chart.status-waterpoints.x-axis-REGION': 'Mikoa',
    'chart.status-waterpoints.x-axis-DISTRICT': 'Wilaya',
    'chart.status-waterpoints.x-axis-WARD': 'Kata',
    'chart.status-waterpoints.y-axis': 'Hali',
    'chart.title-waterpoints-status': 'Hali ya Vituo vya maji',
    'chart.title-waterpoints-status-helptext': 'Iliyopangwa kwa % ya vituo vinavyofanya kazi',
    'chart.title-waterpoints-functional': 'Orodha ya hali ya vituo',
    'chart.title-waterpoints-functional-helptext': '%  ya vituo vinavyofanya kazi',
    'chart.title-boreholes-stats': 'Mabadiliko ya vialamishi',
    'chart.title-boreholes-stats-helptext': 'Wastani kwa miaka',
    'chart.title-population-served': 'Idadi ya watu',
    'chart.title-title-population-served-helptext': 'Uwiano wa idadi ya watu kwa vituo vya maji safi na salama',
    'chart.title.number-boreholes': 'Jumla ya idadi ya visima',
    'chart.waterpoints-people-ratio.x-axis-REGION': 'Mikoa',
    'chart.waterpoints-people-ratio.x-axis-DISTRICT': 'Wilaya',
    'chart.waterpoints-people-ratio.x-axis-WARD': 'Kata',
    'chart.waterpoints-people-ratio.y-axis': 'Uwiano',

    'chart.boreholes.title': 'Visima',
    'chart.boreholes.x-axis': 'Mikoa',
    'chart.boreholes.y-axis': '#',
    'chart.option.DIAMETER': 'Mduara',
    'chart.option.DEPTH_METER': 'Kina kwa mita',
    'chart.option.STATIC_WATER_LEVEL': 'Kiasi cha maji matulivu',
    'chart.option.DYNAMIC_WATER_LEVEL_METER': 'Kiasi cha maji yenye nguvu',
    'chart.option.DRAW _DOWN_METER': 'Kupungua kwa kiwango cha maji',
    'chart.option.YIELD_METER_CUBED_PER_HOUR': 'Mita za ujazo wa maji kwa saa',
    'chart.boreholes-stats.x-axis': 'Miaka',
    'chart.boreholes-stats.y-axis': '#',
    'chart.boreholes.summary': 'Jumuisho la vialamishi',
    'chart.title-boreholes-metric.DIAMETER': 'Mduara',
    'chart.title-boreholes-metric-helptext.DIAMETER': 'Mduara wastani wa visima',
    'chart.title-boreholes-metric.DEPTH_METER': 'Kina',
    'chart.title-boreholes-metric-helptext.DEPTH_METER': 'Kina wastani cha kisima',
    'chart.title-boreholes-metric.STATIC_WATER_LEVEL': 'Kiasi cha maji matulivu',
    'chart.title-boreholes-metric-helptext.STATIC_WATER_LEVEL': 'Kiasi wastani cha maji matulivu',
    'chart.title-boreholes-metric.DYNAMIC_WATER_LEVEL_METER': 'Kiasi wastani cha maji ya nguvu',
    'chart.title-boreholes-metric-helptext.DYNAMIC_WATER_LEVEL_METER': 'Kiasi wastani cha maji',
    'chart.title-boreholes-metric.DRAW _DOWN_METER': 'Kupungua kwa kiasi cha maji kwa mita',
    'chart.title-boreholes-metric-helptext.DRAW _DOWN_METER': 'Mita wastani za kupungua kwa kiasi cha maji',
    'chart.title-boreholes-metric.YIELD_METER_CUBED_PER_HOUR': 'Mita za ujazo wa maji kwa saa',
    'chart.title-boreholes-metric-helptext.YIELD_METER_CUBED_PER_HOUR': 'Mita wastani za ujazo wa maji kwa saa',

    'chart.title-dams': 'Hali ya mabwawa',
    'chart.title-dams-status-helptext': '',
    'chart.dams.x-axis': 'Mikoa',
    'chart.dams.y-axis': '#',

    'chart.option.DAM_HEIGHT': 'Urefu',
    'chart.option.ELEVATION_': 'Mwinuko',
    'chart.option.RESERVOIR_': 'Hifadhi',
    'chart.option.FUNCTIONAL': 'Kituo kinachofanya kazi',
    'chart.option.FUNCTIONAL NEEDS REPAIR': 'Kituo kinachohitaji kurekebishwa',
    'chart.option.NON FUNCTIONAL': 'Kituo hakifanyi kazi',

    'charts.category.filter.title': 'Chagua kama ilivyo ainishwa',
    'charts.sub-category.HARDWARE_PROBLEM': 'Tatizo la kifaa',
    'charts.sub-category.WATER_QUALITY': 'Kiwango cha maji',
    'charts.sub-category.WATER_QUANTITY': 'Kiasi cha maji',
    'charts.sub-category.SOURCE_TYPE': 'Chanzo cha maji',
    'charts.sub-category.value.PUMP STOLEN': 'Bomba iliyoibiwa',
    'charts.sub-category.value.UNDER CONSTRUCTION': 'Katika ujenzi',
    'charts.sub-category.value.PUMP BROKEN': 'Bomba iliyovunjika',
    'charts.sub-category.value.TAP BROKEN': 'Mfereji uliovunjika',
    'charts.sub-category.value.SOURCE DAMAGED': 'Chanzo cha maji kilichoharibika',
    'charts.sub-category.value.PIPE BROKEN': 'Buruma iliyovunjika',
    'charts.sub-category.value.TAP POORLY SITED': 'Mfereji kuwekwa sehemu mbaya',
    'charts.sub-category.value.ENGINE STOLEN': 'Mashine iliyoibiwa',
    'charts.sub-category.value.ENGINE BROKEN': 'Mashine iliyovunjika',
    'charts.sub-category.value.TANK OUT OF USE': 'Hodhi isiyotumika',
    'charts.sub-category.value.MACHINE-DRILLED BOREHOLE': 'Kisima kilichochimbwa kwa mashine',
    'charts.sub-category.value.OTHER': 'Nyingine',
    'charts.sub-category.value.SOFT': 'Maji laini',
    'charts.sub-category.value.SALTY': 'Maji yenye chumvi',
    'charts.sub-category.value.UNKNOWN': 'Haijulikani',
    'charts.sub-category.value.SALTY ABANDONED': 'Maji yenye chumvi yaliyowachwa',
    'charts.sub-category.value.COLOURED': 'Maji yenye rangi',
    'charts.sub-category.value.MILKY': 'Maji maziwa-maziwa',
    'charts.sub-category.value.FLUORIDE': 'Maji yenye flourine',
    'charts.sub-category.value.FLUORIDE ABANDONED': 'Maji yenye flourine yaliyowachwa',
    'charts.sub-category.value.GOOD': 'Nzuri',
    'charts.sub-category.value.ENOUGH': 'Inayotosha',
    'charts.sub-category.value.INSUFFICIENT': 'Haitoshi',
    'charts.sub-category.value.DRY': 'Iliyokauka',
    'charts.sub-category.value.SEASONAL': 'Inayotegemea Misimu',
    'charts.sub-category.value.SHALLOW WELL': 'Kisima juujuu',
    'charts.sub-category.value.MACHINE DBH': 'Mashine DBH',
    'charts.sub-category.value.RIVER': 'Mto',
    'charts.sub-category.value.RAINWATER HARVESTING': 'Kuvuna maji ya mvua',
    'charts.sub-category.value.SPRING': 'Chemchem ya maji',
    'charts.sub-category.value.DAM': 'Bwawa',
    'charts.sub-category.value.LAKE': 'Ziwa',
    'charts.sub-category.value.HAND DTW': 'Hand DTW',
    'charts.sub-category.value.NONE': 'None',
    'charts.sub-category.all': 'Chagua/Usichague yote',
    'charts.years.filter.title': 'Chagua mwaka',
    'charts.years.all': 'Chagua/Usichague yote',
    'charts.years.2009': '2009',
    'charts.years.2010': '2010',
    'charts.years.2011': '2011',
    'charts.years.2012': '2012',
    'charts.years.2013': '2013',
    'charts.years.2014': '2014',
    'chart.waterpoint.summary.top-problem': 'Shida kuu za vituo vya maji',
    'chart.waterpoint.summary.water-quality': 'Kiwango cha maji',
    'chart.waterpoint.summary.water-quantity': 'Kiasi cha maji',
    'chart.waterpoint.summary.source-type': 'Chanzo cha maji',
    'chart.waterpoint.summary.HARDWARE_PROBLEM': 'Tatizo la kifaa',
    'chart.waterpoint.summary.PUMP BROKEN': 'Bomba iliyovunjika',
    'chart.waterpoint.summary.UNDER CONSTRUCTION': 'Katika ujenzi',
    'chart.waterpoint.summary.TAP POORLY SITED': 'Mfereji kuwekwa sehemu mbaya',
    'chart.waterpoint.summary.TAP BROKEN': 'Mfereji Ulioharibika',
    'chart.waterpoint.summary.SOURCE DAMAGED': 'Chanzo cha maji kilichoharibika',
    'chart.waterpoint.summary.PIPE BROKEN': 'Buruma iliyovunjika',
    'chart.waterpoint.summary.TANK OUT OF USE': 'Hodhi isiyotumika',
    'chart.waterpoint.summary.ENGINE BROKEN': 'Mashine iliyovunjika',
    'chart.waterpoint.summary.PUMP STOLEN': 'Bomba iliyoibiwa',
    'chart.waterpoint.summary.ENGINE STOLEN': 'Mashine iliyoibiwa',
    'chart.waterpoint.summary.OTHER': 'Nyingine',
    'chart.waterpoint.summary.DIAMETER': 'Mduara Wastani',
    'chart.waterpoint.summary.DEPTH_METER': 'Kina wastani',
    'chart.waterpoint.summary.STATIC_WATER_LEVEL': 'Kiasi wastani cha maji matulivu',
    'chart.waterpoint.summary.DYNAMIC_WATER_LEVEL_METER': 'Kiasi wastani cha maji yenye nguvu',
    'chart.waterpoint.summary.DRAW_DOWN_METER': 'Mita wastani za kupungua kwa kiasi cha majir',
    'chart.waterpoint.summary.YIELD_METER_CUBED_PER_HOUR': 'Mita wastani za ujazo wa maji kwa saa',
    'chart.waterpoint.summary.SOFT': 'Maji laini',
    'chart.waterpoint.summary.SALTY': 'Maji yenye chumvi',
    'chart.waterpoint.summary.UNKNOWN': 'Haijulikani',
    'chart.waterpoint.summary.SALTY ABANDONED': 'Maji yenye chumvi yaliyowachwa',
    'chart.waterpoint.summary.COLOURED': 'Maji yenye rangi',
    'chart.waterpoint.summary.MILKY': 'Maji maziwa-maziwa',
    'chart.waterpoint.summary.FLUORIDE': 'Maji yenye flourine',
    'chart.waterpoint.summary.FLUORIDE ABANDONED': 'Maji yenye flourine yaliyowachwa',
    'chart.waterpoint.summary.GOOD': 'Nzuri',
    'chart.waterpoint.summary.ENOUGH': 'Inayotosha',
    'chart.waterpoint.summary.INSUFFICIENT': 'Haitoshi',
    'chart.waterpoint.summary.DRY': 'Iliyokauka',
    'chart.waterpoint.summary.SEASONAL': 'Inayotegemea Misimu',
    'chart.waterpoint.summary.SHALLOW WELL': 'Kisima juujuu',
    'chart.waterpoint.summary.MACHINE DBH': 'Mashine DBH',
    'chart.waterpoint.summary.RIVER': 'Mto',
    'chart.waterpoint.summary.RAINWATER HARVESTING': 'Kuvuna maji ya mvua',
    'chart.waterpoint.summary.SPRING': 'Chemchem ya maji',
    'chart.waterpoint.summary.DAM': 'Bwawa',
    'chart.waterpoint.summary.LAKE': 'Ziwa',
    'chart.waterpoint.summary.HAND DTW': 'Hand DTW',
    'chart.waterpoint.summary.NONE': 'None',
    'chart.waterpoint.summary.MACHINE-DRILLED BOREHOLE': 'Kisima kilichochimbwa kwa mashine',
    'chart.pie.WATER_QUALITY': 'Kiwango cha maji',
    'chart.pie.WATER_QUANTITY': 'Kiasi cha maji',
    'chart.pie.SOURCE_TYPE': 'Chanzo cha maji',


    'filters.toggle.closed': 'Kichujio cha Dashibodi',
    'filters.toggle.opened': 'Ficha Kichujio cha Dashibodi',

    'popup.close': 'Ondoka',

    'view-mode.points.waterpoints': 'Vituo vyote vya maji',
    'view-mode.points.dams': 'Mabwawa yote',
    'view-mode.points.boreholes': 'Visima vyote',
    'view-mode.points': i => `All ${i[0]}`,
    'view-mode.region': 'Mkoa',
    'view-mode.district': 'Wilaya',
    'view-mode.ward': 'Kata',
    'view-mode.disabled': 'Data haipo',

    'data-type.waterpoints': 'Vituo vya maji',
    'data-type.boreholes': 'Visima',
    'data-type.dams': 'Mabwawa',

    'overview-bar': 'Maelezo ya joomla',
    'share.share': 'Shirikisha Mwenzako',
    'share.feedback': 'Maoni',
    'share.print': 'Chapa',

    'footer.copy': 'Tovuti hii imechapishwa kwa leseni ya CC BY NC SA 3.0. Programu imeandikwa na kuchapishwa kwa leseni ya GPL 3.0. Wageni wa tovuti wanahamasishwa kuangalia programu kwa makini na kuitumia kama watachapisha programu zao kwa leseni inayolingana.',

    'loading': 'Loading',
    'loading.waterpoints': i => `${i[0]} waterpoints loaded...`,
    'loading.boreholes': i => `${i[0]} boreholes loaded...`,
    'loading.dams': i => `${i[0]} dams loaded...`,
    'loading.regions': 'Loading regions...',
    'loading.districts': 'Loading districts...',
    'loading.wards': 'Loading wards...',
    'loading.points': 'Ukiona ujumbe huu, kuna kosa limetokea katika tovuti.',

    'popup.waterpoint.code': 'Number #',
    'popup.waterpoint.source-type': 'Aina ya chanzo cha kituo cha maji',
    'popup.waterpoint.population-served': 'Idadi ya watu wanaotumikiwa',
    'popup.waterpoint.hardware-problem': 'Kituo cha maji kilicho shida',
    'popup.waterpoint.quantity': 'Kiasi cha maji',
    'popup.waterpoint.quality': 'Kiwango cha maji',
    'popup.waterpoint.location': 'Water Point Location',
    'popup.waterpoint.position': 'Latitude Longitude',
    'popup.waterpoint.region': 'Mkoa',
    'popup.waterpoint.district': 'Wilaya',
    'popup.waterpoint.ward': 'Kata',

    'error': 'We\'re sorry',
    'error.retry': 'Retry',
    'error.api.pre-request': 'An error occurred when the application was preparing to fetch data',
    'error.api.http': 'A network error occurred while trying to fetch data',
    'error.api.http.not-ok': 'A server error occurred while trying to fetch data',
    'error.api.ckan': 'The CKAN data server encountered an error while trying to fetch data',
    'error.api.ckan.unknown-field-type': i => `The CKAN data server returned data of an unknown type '${i[0]}' for field '${i[1]}'`,
    'error.api.ckan.record-missing-field': i => `A record from the CKAN data server was missing the field '${i[0]}'`,
    'error.api.postprocess': 'An error occurred while the application was processing data',
    'error.api.static.postprocess': 'An error occurred while the application was processing boundary data',
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
