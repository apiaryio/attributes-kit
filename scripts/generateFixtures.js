import React from 'react';
import msonZoo from 'mson-zoo'
import jsBeautify from 'js-beautify';
import fs from 'fs'
import path from 'path'
import protagonist from 'protagonist';

import parseMson from '../playground/parseMson';
import AttributesKit from '../src';

const fixtureLocation = path.join(__dirname, '../', 'fixtures');

if (!fs.existsSync(fixtureLocation)) {
    fs.mkdirSync(fixtureLocation);
}

msonZoo.samples.forEach((sample) => {

  parseMson(sample.code, (err, result) => {
    if (err) {
      console.error('Error during mson parse');
      process.exit(1);
    }

    const renderedElement = React.createElement(AttributesKit.Attributes, {
      data: result
    });

    let htmlString = jsBeautify.html(React.renderToStaticMarkup(renderedElement));

    fs.writeFileSync(path.join(fixtureLocation, sample.name), htmlString);
  })
});
