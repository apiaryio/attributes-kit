import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { withKnobs, text, boolean } from '@kadira/storybook-addon-knobs';
import AttributesComponent from '../src/Components/Attributes/Attributes';
import { setOptions } from '@kadira/storybook-addon-options';

import parse from '../lib/parse';
import defaultMSON from './default-mson.md';
import darkThemeSettings from './dark-theme';

setOptions({
  name: 'Attributes kit',
  url: 'https://github.com/apiaryio/attributes-kit',
  showLeftPanel: true,
  showDownPanel: true,
  downPanelInRight: true,
});

// Load all stories in MSON ZOO folder
// we can't use `import` because of dependency of fs module
const context = require.context('../node_modules/mson-zoo/samples', true, /\.md$/);
const zooSource = [];
context.keys().forEach(key => zooSource.push(context(key)));
zooSource.unshift(defaultMSON);

let darkTheme = false;

function getTheme() {
  return darkTheme ? darkThemeSettings : {};
}

function getBackgroundColor() {
  return darkTheme ? '#2b2f3e' : '#fff';
}

const zoo = storiesOf('Attributes kit', module)
  .addDecorator(withKnobs);

zooSource.forEach((sample, i) => {
  const title = (i === 0 ? 'Full component' : `MSON ZOO sample #${i}`);
  zoo.add(title, () => {
    darkTheme = boolean('Dark theme', darkTheme);
    const mson = text('Data structure', sample);
    const data = parse(mson);
    return (
      <div style={{ background: getBackgroundColor(), minHeight: '100vh', paddingTop: '15px' }}>
        <div style={{ width: '400px', margin: '0 auto' }}>
          <AttributesComponent element={data[0]} dataStructures={data} theme={getTheme()} />
        </div>
      </div>
    );
  });
});
