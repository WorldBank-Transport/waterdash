'use strict';

import React, {Component} from 'react';
import {RouteHandler} from 'react-router';

import Header from './boilerplate/header.jsx';
import Filters from './dashboard/filters.jsx';
import Footer from './boilerplate/footer.jsx';

require('stylesheets/layout.scss');

export default class Root extends Component {
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
}
