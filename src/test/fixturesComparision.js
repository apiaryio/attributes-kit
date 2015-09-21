import React from 'react';
import mson_zoo from 'mson-zoo';
import fs from 'fs';
import path from 'path;'


import Attributes from '../dist/server'

describe('Comparision with reference fixtures', () => {
  mson_zoo.samples.forEach((sample) => {
    describe(`If I render ${sample.name} on the server`, () => {
      const renderedElement = React.createElement(Attributes, {
        data: sample.code
      });

      const htmlString = React.renderToString(renderedElement);

      describe('And I compare that with the reference fixture', () => {

        reference = fs.readFileSync(path.join('./fixtures',`${sample.name}.html`));

        it('They should be equal', () => {
          assert.equal(htmlString, reference);
        });
      });
    });
  });
});
