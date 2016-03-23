/* eslint react/jsx-sort-props: 0 */  // Routes: path, component order is nicer
import React from 'react';
import 'babel-core/polyfill';
import 'intl';
import Router, { Redirect, Route } from 'react-router';
import history from './history';
import DataTypes from './constants/data-types';
import ViewModes from './constants/view-modes';
import { load } from './actions/data';
import { setView } from './actions/view';
import { ensureSelect, deselect } from './actions/select';
import { restoreShare } from './actions/share';
import { clear } from './actions/filters';

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
import PolygonsMap from './components/dashboard/polygons-map';
import Popup from './components/dashboard/popup';

/**
 * @param {object} nextState From react-router
 * @returns {void}
 */
function setPointsView(nextState) {
  load(DataTypes.fromParam(nextState.params.dataType));
  setView({
    viewMode: ViewModes.Points(),
    dataType: DataTypes.fromParam(nextState.params.dataType),
  });
  clear();
}

/**
 * @param {object} nextState From react-router
 * @returns {void}
 */
function setPolysView(nextState) {
  clear();
  load(DataTypes.fromParam(nextState.params.dataType));
  setView({
    viewMode: ViewModes.fromParam(nextState.params.polyType),
    dataType: DataTypes.fromParam(nextState.params.dataType),
  });
}

/**
 * @param {object} nextState From react-router
 * @returns {void}
 */
function setShare(nextState) {
  restoreShare(nextState.params.shareId);
}

/**
 * @param {object} nextState From react-router
 * @returns {void}
 */
function ensurePopup(nextState) {
  ensureSelect(nextState.params.id);
}

/**
 * @returns {void}
 */
function intlPoly() {
  require.ensure([
    'intl',
    'intl/locale-data/jsonp/en.js'], function(require) {
      require('intl');
      require('intl/locale-data/jsonp/en');
    });
}

React.render((
  <Router history={history}>
    <Route component={Root} onEnter={intlPoly}>

      <Route component={StaticLayout} >
        <Route path="/" component={Homepage} />
        <Route path="data/" component={Data} />
        <Route path="data/:datasetId" component={Data} />
        <Route path="speak-out/" component={SpeakOut} />
        <Route path="share/:shareId/" component={Homepage} onEnter={setShare} />
      </Route>

      <Route path="/dash/" component={DashRoot} onEnter={intlPoly}>
        {/* Redirect invalid paths that we are missing data for */}
        <Redirect from="points/boreholes/" to="/dash/districts/boreholes/" />
        <Redirect from="wards/boreholes/" to="/dash/districts/boreholes/" />
        <Redirect from="wards/dams/" to="/dash/districts/dams/" />

        {/* Normal dashboard routing */}
        <Route path="points/:dataType/" component={PointsMap} onEnter={setPointsView}>
          <Route path=":id" component={Popup} onEnter={ensurePopup} onExit={deselect} />
        </Route>
        <Route path=":polyType/:dataType/" component={PolygonsMap} onEnter={setPolysView} />
      </Route>

      <Route component={StaticLayout}>
        <Route path="*" component={NotFound} />
      </Route>

    </Route>
  </Router>
), document.body);
