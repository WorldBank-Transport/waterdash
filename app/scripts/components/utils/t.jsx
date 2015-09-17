'use strict';

import React, {Component} from 'react';


let strings_en = {
  'site-name': 'Water Dashboard',

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

  'view-mode.points': 'All Water Points',
  'view-mode.region': 'Region',
  'view-mode.district': 'District',
  'view-mode.ward': 'Ward',

  'footer.copy': 'The content of this website is published under a CC BY NC SA 3.0 license, and the source code is published under a GPL 3.0 license. Visitors are encouraged to examine and re-use the code as long as they publish it under a similar license.',
};


export default class T extends Component {
  propTypes: {
    k: React.PropTypes.string.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {strings: strings_en};
  }
  render() {
    let translated = this.state.strings[this.props.k];
    if (typeof translated === 'undefined') {
      console.warn('missing translation for key', this.props.k);
      translated = this.props.k;
    }
    return <span>{translated}</span>;
  }
}
