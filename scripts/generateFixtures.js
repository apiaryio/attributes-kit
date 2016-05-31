import React from 'react';
import ReactDomServer from 'react-dom/server';
import msonZoo from 'mson-zoo';
import jsBeautify from 'js-beautify';
import fs from 'fs';
import path from 'path';
import dedent from 'dedent';

import parseMson from '../playground/parseMson';
import AttributesKit from '../dist/attributes-kit-server';

const fixtureLocation = path.join(__dirname, '../', 'fixtures');

if (!fs.existsSync(fixtureLocation)) {
  fs.mkdirSync(fixtureLocation);
}

msonZoo.samples.forEach((sample) => {
  let header = '# Data Structures';

  parseMson(`${header}\n\n${sample.fileContent}`, (err, dataStructureElements) => {
    if (err) {
      console.error('An error occured during parsing one of the samples from MSON Zoo.');
      console.error(`Name of the file is ‘${sample.fileName}.’`);
      console.error(err);
      return process.exit(1);
    }

    if (!dataStructureElements || dataStructureElements.length === 0) {
      console.error('An error occured during, no data structure elements were returned.');
      console.error(`Name of the file is ‘${sample.fileName}.’`);
      return process.exit(1);
    }

    const renderedElement = React.createElement(AttributesKit.Attributes, {
      element: dataStructureElements[0],
      collapseByDefault: false,
      includedProperties: 'show',
      inheritedProperties: 'show',
    });

    let htmlString = jsBeautify.html(ReactDomServer.renderToStaticMarkup(renderedElement));

    fs.writeFileSync(path.join(fixtureLocation, sample.fileName), htmlString);
  });
});
