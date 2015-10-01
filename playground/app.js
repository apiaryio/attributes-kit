/* eslint-disable no-console */

import React from 'react';

import Playground from './components/Playground';
import VisualTesting from './components/VisualTesting';

import './styles/layout.styl';

console.log('Welcome in playground');

if (document.getElementById('playgroundContainer') !== null) {
  React.render(<Playground />, document.getElementById('playgroundContainer'));
}

if (document.getElementById('visualtestingContainer') !== null) {
  React.render(<VisualTesting />, document.getElementById('visualtestingContainer'));
}
