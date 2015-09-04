import React from 'react';

import PlaygroundComponent from './components/playground';
import VisualTestingComponent from './components/visual-testing';

import './styles/layout.styl';

console.log('Welcome in playground');

if (document.getElementById('playgroundContainer') !== null) {
  React.render(<PlaygroundComponent />, document.getElementById('playgroundContainer'));
}

if (document.getElementById('visualtestingContainer') !== null) {
  React.render(<VisualTestingComponent />, document.getElementById('visualtestingContainer'));
}

