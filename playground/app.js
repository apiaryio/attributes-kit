/* eslint-disable no-console */

import React from 'react';
import ReactDom from 'react-dom';

import Playground from './components/Playground';
import VisualTesting from './components/VisualTesting';

import './styles/layout.styl';

console.log('Welcome in playground');

if (document.getElementById('playgroundContainer') !== null) {
  ReactDom.render(<Playground />, document.getElementById('playgroundContainer'));
}

if (document.getElementById('visualtestingContainer') !== null) {
  ReactDom.render(<VisualTesting />, document.getElementById('visualtestingContainer'));
}
