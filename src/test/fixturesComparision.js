import React from 'react';
import msonZoo from 'mson-zoo';
import fs from 'fs';
import path from 'path';


import Attributes from '../src/index';

describe('Comparision with reference fixtures', () => {
  msonZoo.samples.forEach((sample) => {
    describe(`If I render ${sample.name} on the server`, () => {
      const renderedElement = React.createElement(Attributes, {
        data: sample.code,
      });

      const htmlString = React.renderToString(renderedElement);

      describe('And I compare that with the reference fixture', () => {
        reference = fs.readFileSync(path.join('./fixtures', `${sample.name}.md`));

        it('They should be equal', () => {
          assert.equal(htmlString, reference);
        });
      });
    });
  });
});
