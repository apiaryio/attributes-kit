import assert from 'assert';
import { preprocess, Preprocessor } from '../Preprocessor';

const CACHE_PROPERTIES = [
  'hasDefault',
  'hasSamples',
  'hasDescription',
  'isArray',
  'isEnum',
  'isSelect',
  'isObject',
  'isIncluded',
  'isInherited',
  'isStructured',
  'isReferenced',
  'containsStructuredElement',
];

describe('Preprocessor', () => {
  describe('Samples', () => {
    context('Process a sample element', () => {
      let processedRefractElement;

      before(() => {
        const refractElement = {
          element: 'string',
          attributes: {
            samples: [
              {
                element: 'string',
                content: 'foo',
              },
              {
                element: 'string',
                content: 'bar',
              },
            ],
          },
          'content': 'baz',
        };

        processedRefractElement = preprocess(refractElement);
      });

      it('First sample element has ‘cache’ property', () => {
        assert.ok(processedRefractElement.attributes.samples[0].cache);
      });

      it('Second sample element has ‘cache’ property', () => {
        assert.ok(processedRefractElement.attributes.samples[1].cache);
      });

      CACHE_PROPERTIES.forEach((property) => {
        it(`Property ‘${property}’ of the first sample has the correct value`, () => {
          assert.strictEqual(
            processedRefractElement.attributes.samples[0].cache[property],
            false
          );
        });
      });

      CACHE_PROPERTIES.forEach((property) => {
        it(`Property ‘${property}’ of the second sample has the correct value`, () => {
          assert.strictEqual(
            processedRefractElement.attributes.samples[1].cache[property],
            false
          );
        });
      });
    });

    context('Process a member sample element', () => {
      let processedRefractElement;
      let cache;

      before(() => {
        const refractElement = {
          element: 'object',
          attributes: {
            samples: [
              [
                {
                  element: 'member',
                  content: {
                    key: {
                      element: 'string',
                      content: 'foo',
                    },
                    value: {
                      element: 'string',
                      content: 'bar',
                    },
                  },
                },
              ],
            ],
          },
          'content': [],
        };

        processedRefractElement = preprocess(refractElement);
      });

      it('Sample element has ‘cache’ property', () => {
        cache = processedRefractElement.attributes.samples[0][0].cache;
        assert.ok(cache);
      });

      CACHE_PROPERTIES.forEach((property) => {
        it(`Property ‘${property}’ has the correct value`, () => {
          assert.strictEqual(cache[property], false);
        });
      });
    });
  });
});
