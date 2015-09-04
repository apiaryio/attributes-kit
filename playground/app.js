import React from 'react';

import PlaygroundComponent from './components/playground';
import './styles/layout.css';

console.log('Welcome in playground');

React.render(<PlaygroundComponent />, document.getElementById('container'));
