import React from 'react';
import request from 'superagent'
import mson_zoo from 'mson-zoo'
import fs from 'fs'


import Attributes from '../dist/server'

mson_zoo.samples.forEach((sample) => {
  const renderedElement = React.createElement(Attributes, {
    data: sample.code
  });

  const htmlString = React.renderToString(renderedElement);
  fs.writeFileSync(sample.name, htmlString);
});

process.exit(0);
