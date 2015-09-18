'use strict';

import React from 'react';
import {RouteHandler} from 'react-router';

import Header from './boilerplate/header.jsx';
import Filters from './dashboard/filters.jsx';
import Footer from './boilerplate/footer.jsx';

require('stylesheets/layout.scss');

const Root = React.createClass({
  render() {
    return (
      <div>
        <Header />
        <Filters />
        {this.props.children}
        <Footer />
      </div>
    );
  }
});

export default Root;
