'use strict';

import React, {Component} from 'react';
import T from '../utils/t.jsx';
import OpenDataNav from './open-data-nav.jsx';

export default class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <OpenDataNav />
        <p className="copy"><T k="footer.copy" /></p>
      </div>
    );
  }
}
