import React from 'react';
import ReactDomServer from 'react-dom/server';
import msonZoo from 'mson-zoo';
import jsBeautify from 'js-beautify';
import fs from 'fs';
import path from 'path';
import assert from 'assert';
import dedent from 'dedent';


import parseMson from '../playground/parseMson';
import { Attributes } from '../dist/attributes-kit-server';

describe('Comparision with reference fixtures', () => {

  msonZoo.samples.forEach((sample) => {
    let renderedElement = null;
    let htmlString = null;

    describe(`If I render ${sample.name} on the server`, (done) => {

      let header = dedent`
        # Data Structures

        ## MSON Struct
      `;

      parseMson(`${header}\n${sample.code}`, (err, result) => {
        if (err) {
          return done(err);
        }

        renderedElement = React.createElement(Attributes, {
          element: result[0],
        });

        htmlString = jsBeautify.html(ReactDomServer.renderToStaticMarkup(renderedElement));
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
