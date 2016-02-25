/* eslint-disable no-console */

import React from 'react';
import { render } from 'react-dom';
import { Router, Route } from 'react-router';
import { Style } from 'radium';

import Playground from './components/Playground';
import Examples from './components/Examples';

import createBrowserHistory from 'history/lib/createBrowserHistory';

render((
  <div>
    <Router history={createBrowserHistory()}>
      <Route path="/" component={Playground}/>
      <Route path="/playground" component={Playground}/>
      <Route path="/examples" component={Examples}/>
    </Router>

    <Style
      rules={{
        '*': {
          boxSizing: 'border-box',
          margin: '0',
          padding: '0',
        },
        '.visualTestingContainer': {
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        },
        '.column': {
          float: 'left',
          width: '30%',
          padding: '10px',
        },
        '.column textarea': {
          width: '100%',
          minHeight: '200px',
        },
      }}
    />
  </div>
), document.getElementById('applicationContainer'));
