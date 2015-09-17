'use strict';

import React, {Component} from 'react';
import T from '../utils/t.jsx';
import OpenDataNav from './open-data-nav.jsx';

require('stylesheets/boilerplate/footer.scss');


export default class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <div className="footer-nav">
          <OpenDataNav />
        </div>
        <p className="copy"><T k="footer.copy" /></p>
      </div>
    );
  }
}
