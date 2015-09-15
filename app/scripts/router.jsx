'use strict';

// circular import handling: indirection via getter function that is called later
module.exports = {
  get: function() {
    return router;  // gets hoisted, see last line of this file
  }
};

var React = require('react');
var Router = require('react-router');
var {Route, DefaultRoute} = require('react-router');


var Root = require('./components/root.jsx');


var routes = (
  <Route name="main" path="/" handler={Root} />
);


var router = Router.create({
  routes: routes
});
