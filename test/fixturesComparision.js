import React from 'react';
import msonZoo from 'mson-zoo';
import fs from 'fs';
import path from 'path';
import assert from 'assert'


import parseMson from '../playground/parseMson'
import {Attributes} from '../src/index';

describe('Comparision with reference fixtures', () => {

  msonZoo.samples.forEach((sample) => {
    let renderedElement = null;
    let htmlString = null;

    describe(`If I render ${sample.name} on the server`, (done) => {

      parseMson(sample.code, (err, result) => {
        if (err) {
          return done(err);
        }
        renderedElement = React.createElement(Attributes, {
          data: result,
        });

        htmlString = React.renderToStaticMarkup(renderedElement);
      });

      describe('And I compare that with the reference fixture', () => {
        const reference = fs.readFileSync(path.join('./fixtures', `${sample.name}`));

        it('They should be equal', () => {
          assert.equal(htmlString, reference);
        });
      });
    });
  });
});
