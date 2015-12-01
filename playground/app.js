/* eslint-disable no-console */

import React from 'react';
import { render } from 'react-dom';
import { Router, Route } from 'react-router';

import Playground from './components/Playground';
import VisualTesting from './components/VisualTesting';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import './styles/layout.styl';

const history = createBrowserHistory();

render((
  <Router history={history}>
    <Route path="/" component={Playground}/>
    <Route path="/playground" component={Playground}/>
    <Route path="/examples" component={VisualTesting}/>
  </Router>
), document.getElementById('applicationContainer'));
