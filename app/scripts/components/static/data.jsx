import React from 'react';
import DataSources from '../boilerplate/external-links';
import Footer from '../boilerplate/footer';
import T from '../misc/t';

require('stylesheets/boilerplate/static-content');

const Data = React.createClass({
  render() {
    return (
      <div>
      <div className="main secondary">
        <div className="static-content">
        <h2><T k="static.data-title" /></h2>
        <p><T k="static.data-content" /></p>
          <DataSources />
        </div>
      </div>
      <Footer/>
      </div>

    );
  },
});

export default Data;
