import React from 'react';
import request from 'superagent'
import mson_zoo from 'mson-zoo'


import Attributes from '../dist/server'

mson_zoo.samples.forEach((element) => {
  const renderedElement = React.createElement(Attributes, {
    data: element
  });

  const htmlString = React.renderToString(renderedElement);
  console.log(htmlString);
});

process.exit(0);
