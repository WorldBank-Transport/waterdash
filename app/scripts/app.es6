'use strict';
var React = require('react');
var router = require('./router.jsx').get();  // function indirection to avoid circular import issues


router.run(function(Handler, state) {
  var reactEl = React.createElement(Handler, state);
  var domContainer = document.getElementById('app');
  React.render(reactEl, domContainer);
});
