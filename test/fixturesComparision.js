import React from 'react';
import ReactDomServer from 'react-dom/server';
import msonZoo from 'mson-zoo';
import jsBeautify from 'js-beautify';
import fs from 'fs';
import path from 'path';
import assert from 'assert';
import minim from 'minim';
import minimParseResult from 'minim-parse-result';

import parseMson from '../playground/parseMson';
import { Attributes } from '../dist/attributes-kit-server';

describe('Comparision with reference fixtures', () => {

  /**
   *  Formats the style CSS attribute properties and sorts them for stable comparison
   *
   *  converts this:
   *    `<div style="width:100%;height:auto;display:flex;flex-direction:row;">`
   *
   *  into:
   *    `<div style="
   *     display:flex
   *     flex-direction: row
   *     height:auto
   *     width:100%
   *     ">`
   */
  const formatStyle = html => html.replace(
    /style\=\"([^\"]+)\"/g,
    (m, s) => `style="\n${s.split(';').sort().filter(s => s.length).join('\n')}\n"`);


  msonZoo.samples.forEach((sample) => {
    let renderedElement = null;
    let htmlString = null;

    describe(`If I render ${sample.fileName} on the server`, (done) => {
      const header = '# Data Structures';

      parseMson(`${header}\n${sample.fileContent}`, (err, dataStructureElements) => {
        if (err) {
          return done(err);
        }

        // to minim
        const minimNamespace = minim.namespace().use(minimParseResult);
        dataStructureElements = minimNamespace.fromRefract(dataStructureElements);

        renderedElement = React.createElement(Attributes, {
          element: dataStructureElements.first,
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
          assert.equal(formatStyle(htmlString), formatStyle(reference));
        });
      });
    });
  });
});
