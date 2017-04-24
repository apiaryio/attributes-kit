import React from 'react';
import ReactDomServer from 'react-dom/server';
import msonZoo from 'mson-zoo';
import jsBeautify from 'js-beautify';
import fs from 'fs';
import path from 'path';
import parse from '../lib/parse';

import AttributesKit from '../dist/attributes-kit';

const fixtureLocation = path.join(__dirname, '../', 'fixtures');

if (!fs.existsSync(fixtureLocation)) {
  fs.mkdirSync(fixtureLocation);
}

msonZoo.samples.forEach((sample) => {
  const dataStructureElements = parse(sample.fileContent);
  if (!dataStructureElements || dataStructureElements.length === 0) {
    console.error('An error occured during, no data structure elements were returned.');
    console.error(`Name of the file is ‘${sample.fileName}.’`);
    throw new Error('No data structure elements were returned.');
  }

  const renderedElement = React.createElement(AttributesKit.Attributes, {
    element: dataStructureElements[0],
    collapseByDefault: false,
    includedProperties: 'show',
    inheritedProperties: 'show',
  });

  const htmlString = jsBeautify.html(ReactDomServer.renderToStaticMarkup(renderedElement));

  fs.writeFileSync(path.join(fixtureLocation, sample.fileName), htmlString);
});

console.log('All good!');
