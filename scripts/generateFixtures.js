import React from 'react';
import mson_zoo from 'mson-zoo'
import fs from 'fs'
import path from 'path'


import Attributes from '../dist/server'

mson_zoo.samples.forEach((sample) => {
  const renderedElement = React.createElement(Attributes, {
    data: sample.code
  });

  const htmlString = React.renderToString(renderedElement);
  fs.writeFileSync(path.join('./fixtures', `${sample.name}.html`, htmlString));
});

process.exit(0);
