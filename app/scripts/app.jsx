/* eslint react/jsx-sort-props: 0 */  // Routes: path, component order is nicer
import React from 'react';
import Router, { Redirect, Route } from 'react-router';
import history from './history';
import DataTypes from './constants/data-types';
import ViewModes from './constants/view-modes';
import { setView } from './actions/view.es6';

// Route components
import Root from './components/root';
// static page components:
import StaticLayout from './components/static/layout';
import Homepage from './components/static/homepage';
import Data from './components/static/data';
import SpeakOut from './components/static/speak-out';
import NotFound from './components/static/not-found';
// dashboard views
import DashRoot from './components/dashboard/dash-root';
import PointsMap from './components/dashboard/points-map';
import Point from './components/dashboard/point';
import PolygonsMap from './components/dashboard/polygons-map';
import Polygon from './components/dashboard/polygon';

/**
 * @param {object} nextState From react-router
 * @returns {void}
 */
function setPointsView(nextState) {
  setView({
    viewMode: ViewModes.Points(),
    dataType: DataTypes.fromParam(nextState.params.dataType),
  });
}

/**
 * @param {object} nextState From react-router
 * @returns {void}
 */
function setPolysView(nextState) {
  setView({
    viewMode: ViewModes.fromParam(nextState.params.polyType),
    dataType: DataTypes.fromParam(nextState.params.dataType),
  });
}


React.render((
  <Router history={history}>
    <Route component={Root}>

      <Route component={StaticLayout}>
        <Route path="/" component={Homepage} />
        <Route path="data/" component={Data} />
        <Route path="speak-out/" component={SpeakOut} />
      </Route>

      <Route path="/dash/" component={DashRoot}>
        {/* Redirect invalid paths -- we don't have points or wards for dams & boreholes */}
        <Redirect from="points/boreholes/" to="/dash/districts/boreholes/" />
        <Redirect from="wards/boreholes/" to="/dash/districts/boreholes/" />
        <Redirect from="points/dams/" to="/dash/districts/dams/" />
        <Redirect from="wards/dams/" to="/dash/districts/dams/" />
        {/* We don't have wards for waterpoints */}
        <Redirect from="wards/waterpoints/" to="/dash/districts/waterpoints/" />

        {/* Normal dashboard routing */}
        <Route path="points/:dataType/" component={PointsMap} onEnter={setPointsView}>
          <Route path=":id" component={Point} />
        </Route>
        <Route path=":polyType/:dataType/" component={PolygonsMap} onEnter={setPolysView}>
          <Route path=":id" component={Polygon} />
        </Route>
      </Route>

      <Route component={StaticLayout}>
        <Route path="*" component={NotFound} />
      </Route>

    </Route>
  </Router>
), document.body);
