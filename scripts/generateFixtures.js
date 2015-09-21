import React from 'react';
import mson_zoo from 'mson-zoo'
import fs from 'fs'
import path from 'path'


import {Attributes} from '../dist/server'

const fixtureLocation = path.join(__dirname, '../', 'fixtures');

if (!fs.existsSync(fixtureLocation)) {
    fs.mkdirSync(fixtureLocation);
}

mson_zoo.samples.forEach((sample) => {

  const renderedElement = React.createElement('Attributes', {
    data: sample.code
  });

  const htmlString = React.renderToString(renderedElement);
  fs.appendFileSync(path.join(fixtureLocation, sample.name), htmlString);
});

process.exit(0);
