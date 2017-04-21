import React from 'react';
import async from 'async';
import ReactDomServer from 'react-dom/server';
import msonZoo from 'mson-zoo';
import jsBeautify from 'js-beautify';
import fs from 'fs';
import path from 'path';
import drafter from 'drafter.js';
import get from 'lodash/get';

import AttributesKit from '../dist/attributes-kit';

const fixtureLocation = path.join(__dirname, '../', 'fixtures');

if (!fs.existsSync(fixtureLocation)) {
  fs.mkdirSync(fixtureLocation);
}

async.forEachOfLimit(msonZoo.samples, 10, (sample, sampleIndex, next) => {
  const header = '# Data Structures';

  const dataStructureElements = get(drafter.parse(`${header}\n${sample.fileContent}`, {}), 'content[0].content[0].content', []).map(el => el.content[0]);
  if (!dataStructureElements || dataStructureElements.length === 0) {
    console.error('An error occured during, no data structure elements were returned.');
    console.error(`Name of the file is ‘${sample.fileName}.’`);
    return next(new Error('No data structure elements were returned.'));
  }

  const renderedElement = React.createElement(AttributesKit.Attributes, {
    element: dataStructureElements[0],
    collapseByDefault: false,
    includedProperties: 'show',
    inheritedProperties: 'show',
  });

  const htmlString = jsBeautify.html(ReactDomServer.renderToStaticMarkup(renderedElement));

  fs.writeFileSync(path.join(fixtureLocation, sample.fileName), htmlString);

  next();
}, (err) => {
  if (err) {
    process.exit(1);
  }

  console.log('All good!');
});
