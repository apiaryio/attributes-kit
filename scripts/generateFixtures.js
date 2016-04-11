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

  let header = dedent`
    # Data Structures

    ## MSON Struct
  `;

  parseMson(`${header}\n${sample.code}`, (err, result) => {
    if (err) {
      console.error('Error during mson parse');
      process.exit(1);
    }

    const renderedElement = React.createElement(AttributesKit.Attributes, {
      element: result[0],
      collapseByDefault: false,
      maxInheritanceDepth: undefined,
      includedProperties: 'show',
      inheritedProperties: 'show',
    });

    let htmlString = jsBeautify.html(ReactDomServer.renderToStaticMarkup(renderedElement));

    fs.writeFileSync(path.join(fixtureLocation, sample.name), htmlString);
  });
});
