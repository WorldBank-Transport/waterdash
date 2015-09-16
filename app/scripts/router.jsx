'use strict';

// circular import handling: indirection via getter function that is called later
export default () => router;  // gets hoisted, see last line of this file

import React from 'react';
import Router from 'react-router';
import {Route, DefaultRoute} from 'react-router';


import Root from './components/root.jsx';


var routes = (
  <Route name="main" path="/" handler={Root} />
);


var router = Router.create({
  routes: routes
});
