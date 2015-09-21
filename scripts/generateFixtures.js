import React from 'react';
import request from 'superagent'


import Attributes from '../dist/server'
import '../playground/server'

request
  .get('http://localhost:9090/fixtures')
  .set('Accept', 'application/json')
  .end((err, res) => {
    res.body.forEach((element) => {
      const renderedElement = React.createElement(Attributes, {
        data: element
      });

      const htmlString = React.renderToString(renderedElement);
      console.log(htmlString);
    });

    process.exit(0);

  });


