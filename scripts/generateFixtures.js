import React from 'react';
import async from 'async';
import ReactDomServer from 'react-dom/server';
import msonZoo from 'mson-zoo';
import jsBeautify from 'js-beautify';
import fs from 'fs';
import path from 'path';
import { Namespace } from 'api-elements';

import parseMson from '../playground/parseMson';
import AttributesKit from '../dist/attributes-kit-server';

const fixtureLocation = path.join(__dirname, '../', 'fixtures');

if (!fs.existsSync(fixtureLocation)) {
  fs.mkdirSync(fixtureLocation);
}

async.forEachOfLimit(msonZoo.samples, 10, (sample, sampleIndex, next) => {
  const header = '# Data Structures';

  parseMson(`${header}\n\n${sample.fileContent}`, (err, dataStructureElements) => {
    if (err) {
      console.error('An error occured during parsing one of the samples from MSON Zoo.');
      console.error(`Name of the file is ‘${sample.fileName}.’`);
      return next(err);
    }

    if (!dataStructureElements || dataStructureElements.length === 0) {
      console.error('An error occured during, no data structure elements were returned.');
      console.error(`Name of the file is ‘${sample.fileName}.’`);
      return next(new Error('No data structure elements were returned.'));
    }

    const minimNamespace = new Namespace();
    dataStructureElements = minimNamespace.fromRefract(dataStructureElements);

    const renderedElement = React.createElement(AttributesKit.Attributes, {
      element: dataStructureElements.first,
      collapseByDefault: false,
      includedProperties: 'show',
      inheritedProperties: 'show',
    });

    const htmlString = jsBeautify.html(ReactDomServer.renderToStaticMarkup(renderedElement));

    fs.writeFileSync(path.join(fixtureLocation, sample.fileName), htmlString);

    next();
  });
}, (err) => {
  if (err) {
    process.exit(1);
  }

  console.log('All good!');
});
