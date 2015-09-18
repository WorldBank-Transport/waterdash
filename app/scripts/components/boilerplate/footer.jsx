'use strict';

import React from 'react';
import T from '../utils/t.jsx';
import OpenDataNav from './open-data-nav.jsx';

require('stylesheets/boilerplate/footer.scss');


const Footer = React.createClass({
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
});

export default Footer;
