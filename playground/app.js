/* eslint-disable no-console */

import React from 'react';
import { render } from 'react-dom';
import { Router, Route } from 'react-router';

import Playground from './components/Playground';
import Examples from './components/Examples';

import createBrowserHistory from 'history/lib/createBrowserHistory';

import './styles/layout.css';

render((
  <Router history={createBrowserHistory()}>
    <Route path="/" component={Playground}/>
    <Route path="/playground" component={Playground}/>
    <Route path="/examples" component={Examples}/>
  </Router>
), document.getElementById('applicationContainer'));
