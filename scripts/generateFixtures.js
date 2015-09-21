import React from 'react';
import mson_zoo from 'mson-zoo'
import fs from 'fs'
import path from 'path'
import protagonist from 'protagonist';
import parseMson from '../playground/parseMson'


import {Attributes} from '../src/index'

const fixtureLocation = path.join(__dirname, '../', 'fixtures');

if (!fs.existsSync(fixtureLocation)) {
    fs.mkdirSync(fixtureLocation);
}

mson_zoo.samples.forEach((sample) => {

  parseMson(sample.code, (err, result) => {
    if (err) {
      console.error('Error during mson parse');
      process.exit(1);
    }

    const renderedElement = React.createElement(Attributes, {
      data: result
    });

    const htmlString = React.renderToString(renderedElement);
    fs.appendFileSync(path.join(fixtureLocation, sample.name), htmlString);
  })
});


