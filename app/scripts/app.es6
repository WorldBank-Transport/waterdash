'use strict';
import React from 'react';
import router from './router.jsx';  // a function, avoids circular import

router().run(function(Handler, state) {
  var reactEl = React.createElement(Handler, state);
  var domContainer = document.getElementById('app');
  React.render(reactEl, domContainer);
});
