/* eslint-disable no-console */

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import Playground from './components/Playground';
import VisualTesting from './components/VisualTesting';
import DefaultLayout from './components/DefaultLayout';
import AttributesKit from '../src';
import JsonFormatterComponent from './components/JsonFormatter';

import './styles/layout.styl';

render((
  <Router history={createBrowserHistory()}>
    <Route path="/" component={DefaultLayout}>
      <Route path="/playground" component={Playground}>
        <Route path="attributes" component={AttributesKit.Attributes} />
        <Route path="refract" component={JsonFormatterComponent} />
        <IndexRoute component={JsonFormatterComponent}/>
      </Route>
      <Route path="/examples" component={VisualTesting}/>
      <IndexRoute component={Playground}/>
    </Route>
  </Router>
), document.getElementById('applicationContainer'));
