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

    describe(`If I render ${sample.fileName} on the server`, (done) => {
      let header = '# Data Structures';

      parseMson(`${header}\n${sample.fileContent}`, (err, dataStructureElements) => {
        if (err) {
          return done(err);
        }

        renderedElement = React.createElement(Attributes, {
          element: dataStructureElements[0],
          dataStructures: dataStructureElements,
          collapseByDefault: false,
          maxInheritanceDepth: undefined,
          includedProperties: 'show',
          inheritedProperties: 'show',
        });

        htmlString = jsBeautify.html(ReactDomServer.renderToStaticMarkup(renderedElement));
      });

      describe('And I compare that with the reference fixture', () => {
        const reference = fs.readFileSync(
          path.join('./fixtures', `${sample.fileName}`),
          'utf8'
        );

        it('They should be equal', () => {
          assert.equal(htmlString, reference);
        });
      });
    });
  });
});
