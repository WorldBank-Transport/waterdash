/* eslint react/jsx-sort-props: 0 */  // Routes: path, component order is nicer
import React from 'react';
import Router, {Route, IndexRoute} from 'react-router';

import Root from 'components/root.jsx';
import WaterPoints from 'components/dashboard/waterpoints.jsx';
import WaterPoint from 'components/dashboard/waterpoint.jsx';
import Polygons from 'components/dashboard/polygons.jsx';
import Polygon from 'components/dashboard/polygon.jsx';
import Data from 'components/static/data.jsx';
import SpeakOut from 'components/static/speak-out.jsx';
import NotFound from 'components/static/not-found.jsx';


React.render((
  <Router>
    <Route path="/" component={Root}>
      <IndexRoute component={WaterPoints} />
      <Route path="waterpoints/:id" component={WaterPoint} />
      <Route path="data/" component={Data} />
      <Route path="speak-out/" component={SpeakOut} />
      <Route path=":polytype/" component={Polygons}>
        <Route path=":id" component={Polygon} />
      </Route>
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
), document.body);
