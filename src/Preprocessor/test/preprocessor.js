import assert from 'assert';
import {preprocess} from '../Preprocessor';

describe('Preprocessor', () => {
  context('cache.hasDefault', () => {
    it('is true if default is present', () => {
      const refract = {
        element: 'string',
        attributes: {
          default: 'hello, world!',
        },
      };
      const processed = preprocess(refract);
      assert.equal(processed.cache.hasDefault, true);
    });

    it('is true if default is falsey', () => {
      const refract = {
        element: 'boolean',
        attributes: {
          default: false,
        },
      };
      const processed = preprocess(refract);
      assert.equal(processed.cache.hasDefault, true);
    });

    it('is false if default is missing', () => {
      const refract = {
        element: 'string',
        content: 'test',
      };
      const processed = preprocess(refract);
      assert.equal(processed.cache.hasDefault, false);
    });
  });

  context('cache.hasSamples', () => {
    it('is true if samples are present', () => {
      const refract = {
        element: 'string',
        attributes: {
          samples: ['hello', 'world'],
        },
      };
      const processed = preprocess(refract);
      assert.equal(processed.cache.hasSamples, true);
    });

    it('is false if samples key is present but empty', () => {
      const refract = {
        element: 'string',
        attributes: {
          samples: [],
        },
      };
      const processed = preprocess(refract);
      assert.equal(processed.cache.hasSamples, false);
    });

    it('is false if samples key is present but not array', () => {
      const refract = {
        element: 'string',
        attributes: {
          samples: null,
        },
      };
      const processed = preprocess(refract);
      assert.equal(processed.cache.hasSamples, false);
    });

    it('is false if samples key is missing', () => {
      const refract = {
        element: 'string',
      };
      const processed = preprocess(refract);
      assert.equal(processed.cache.hasSamples, false);
    });
  });

  context('cache.hasDescription', () => {
    it('is true if description is present', () => {
      const refract = {
        element: 'string',
        meta: {
          description: 'hello',
        }
      };
      const processed = preprocess(refract);
      assert.equal(processed.cache.hasDescription, true);
    });

    it('is false if description is empty', () => {
      const refract = {
        element: 'string',
        meta: {
          description: '',
        }
      };
      const processed = preprocess(refract);
      assert.equal(processed.cache.hasDescription, false);
    });

    it('is false if description is missing', () => {
      const refract = {
        element: 'string',
      };
      const processed = preprocess(refract);
      assert.equal(processed.cache.hasDescription, false);
    });
  });

  ['array', 'enum', 'select', 'object'].forEach((element) => {
    const property = `is${element.charAt(0).toUpperCase() + element.slice(1)}`
    context(`cache.${property}`, () => {
      it(`is true if element is ${element}`, () => {
        const refract = {
          element: element,
        };
        const processed = preprocess(refract);
        assert.equal(processed.cache[property], true);
      });

      it(`is true if member element value type is ${element}`, () => {
        const refract = {
          element: 'member',
          content: {
            key: {
              element: 'string',
              content: 'foo',
            },
            value: {
              element: element,
            },
          },
        };
        const processed = preprocess(refract);
        assert.equal(processed.cache[property], true);
      });

      it(`is false if element is not ${element}`, () => {
        const refract = {
          element: 'boolean',
        };
        const processed = preprocess(refract);
        assert.equal(processed.cache[property], false);
      });
    });
  });

  context('cache.isIncluded', () => {
    it('is true if link relation is present', () => {
      const refract = {
        element: 'string',
        meta: {
          links: [
            {
              relation: 'origin',
              href: 'http://refract.link/included-member/',
            }
          ]
        }
      };
      const processed = preprocess(refract);
      assert.equal(processed.cache.isIncluded, true);
    });

    it('is false if link relation is not a match', () => {
      const refract = {
        element: 'string',
        meta: {
          links: [
            {
              relation: 'origin',
              href: 'http://refract.link/other/',
            }
          ]
        }
      };
      const processed = preprocess(refract);
      assert.equal(processed.cache.isIncluded, false);
    });

    it('is false if link relation is missing', () => {
      const refract = {
        element: 'string',
      };
      const processed = preprocess(refract);
      assert.equal(processed.cache.isIncluded, false);
    });
  });

  context('cache.isInherited', () => {
    it('is true if link relation is present', () => {
      const refract = {
        element: 'string',
        meta: {
          links: [
            {
              relation: 'origin',
              href: 'http://refract.link/inherited-member/',
            }
          ]
        }
      };
      const processed = preprocess(refract);
      assert.equal(processed.cache.isInherited, true);
    });

    it('is false if link relation is not a match', () => {
      const refract = {
        element: 'string',
        meta: {
          links: [
            {
              relation: 'origin',
              href: 'http://refract.link/other/',
            }
          ]
        }
      };
      const processed = preprocess(refract);
      assert.equal(processed.cache.isInherited, false);
    });

    it('is false if link relation is missing', () => {
      const refract = {
        element: 'string',
      };
      const processed = preprocess(refract);
      assert.equal(processed.cache.isInherited, false);
    });
  });

  context('cache.isStructured', () => {
    it('is true if the type is object', () => {
      const refract = {
        element: 'object',
      };
      const processed = preprocess(refract);
      assert.equal(processed.cache.isStructured, true);
    });
    it('is true if the type is array', () => {
      const refract = {
        element: 'array',
      };
      const processed = preprocess(refract);
      assert.equal(processed.cache.isStructured, true);
    });
    it('is true if the type is enum', () => {
      const refract = {
        element: 'enum',
      };
      const processed = preprocess(refract);
      assert.equal(processed.cache.isStructured, true);
    });
    it('is true if the type is select', () => {
      const refract = {
        element: 'select',
      };
      const processed = preprocess(refract);
      assert.equal(processed.cache.isStructured, true);
    });
    it('is true if the type is member with the value type object', () => {
      const refract = {
        element: 'member',
        content: {
          value: {
            element: 'object',
          },
        },
      };
      const processed = preprocess(refract);
      assert.equal(processed.cache.isStructured, true);
    });
    it('is false if the type is boolean', () => {
      const refract = {
        element: 'boolean',
      };
      const processed = preprocess(refract);
      assert.equal(processed.cache.isStructured, false);
    });
  });

  context('cache.isReferenced', () => {
    it('is true if all children have meta.ref', () => {
      const refract = {
        element: 'member',
        content: {
          value: {
            element: 'object',
            content: [
              {
                element: 'member',
                meta: {
                  ref: 'MyBase',
                },
              },
            ],
          },
        },
      };
      const processed = preprocess(refract);
      assert.equal(processed.cache.isReferenced, true);
    });

    it('is false if only some children have meta.ref', () => {
      const refract = {
        element: 'member',
        content: {
          value: {
            element: 'object',
            content: [
              {
                element: 'member',
                meta: {
                  ref: 'MyBase',
                },
              },
              {
                element: 'member',
              },
            ],
          },
        },
      };
      const processed = preprocess(refract);
      assert.equal(processed.cache.isReferenced, false);
    });

    it('is false if there are no children', () => {
      const refract = {
        element: 'member',
        content: {
          value: {
            element: 'string',
          },
        },
      };
      const processed = preprocess(refract);
      assert.equal(processed.cache.isReferenced, false);
    });

    it('is false if type is not member', () => {
      const refract = {
        element: 'boolean',
      };
      const processed = preprocess(refract);
      assert.equal(processed.cache.isReferenced, false);
    });
  });

  context('cache.containsStructuredElement', () => {
    it('is true if a child is structured', () => {
      const refract = {
        element: 'array',
        content: [
          {
            element: 'object',
          }
        ],
      };
      const processed = preprocess(refract);
      assert.equal(processed.cache.containsStructuredElement, true);
    });

    it('is false if no child is structured', () => {
      const refract = {
        element: 'array',
        content: [
          {
            element: 'boolean',
          },
          {
            element: 'number',
          },
        ],
      };
      const processed = preprocess(refract);
      assert.equal(processed.cache.containsStructuredElement, false);
    });

    it('is false if there are no children', () => {
      const refract = {
        element: 'array',
      };
      const processed = preprocess(refract);
      assert.equal(processed.cache.containsStructuredElement, false);
    });
  });
});
