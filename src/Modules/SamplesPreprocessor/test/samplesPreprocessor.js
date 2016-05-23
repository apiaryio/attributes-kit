import assert from 'assert';
import { preprocess } from '../SamplesPreprocessor';

describe('Samples Preprocessor', () => {
  context('Process a sample element', () => {
    let processedRefractElement;

    before(() => {
      const refractElement = {
        element: 'string',
        attributes: {
          samples: [
            'foo',
            'bar',
          ],
        },
        'content': 'baz',
      };

      processedRefractElement = preprocess(refractElement);
    });

    it('First sample element has been processed', () => {
      assert.deepEqual(
        processedRefractElement.attributes.samples[0],
        {
          element: 'string',
          content: 'foo',
        }
      );
    });

    it('Second sample element has been processed', () => {
      assert.deepEqual(
        processedRefractElement.attributes.samples[1],
        {
          element: 'string',
          content: 'bar',
        }
      );
    });
  });

  context('Process a nested sample element', () => {
    let processedRefractElement;

    before(() => {
      const refractElement = {
        "element": "object",
        "content": [
          {
            "element": "member",
            "content": {
              "key": {
                "element": "string",
                "content": "foo"
              },
              "value": {
                "element": "object",
                "content": [
                  {
                    "element": "member",
                    "content": {
                      "key": {
                        "element": "string",
                        "content": "bar"
                      },
                      "value": {
                        "element": "string",
                        "attributes": {
                          "samples": [
                            "bag"
                          ]
                        },
                        "content": "baz"
                      }
                    }
                  }
                ]
              }
            }
          }
        ]
      };

      processedRefractElement = preprocess(refractElement);
    });

    it('First sample element has been processed', () => {
      assert.deepEqual(
        processedRefractElement.content[0].content.value.content[0].content.value.attributes.samples,
        [
          {
            element: 'string',
            content: 'bag',
          }
        ]
      );
    });
  });

  context('Process a sample of an object element', () => {
    let processedRefractElement;

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

    it('First sample element has been processed', () => {
      assert.deepEqual(
        processedRefractElement.attributes.samples[0],
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
      );
    });
  });

  context('Process a sample of a nested object element', () => {
    let processedRefractElement;

    before(() => {
      const refractElement = {
        "element": "object",
        "content": [
          {
            "element": "member",
            "content": {
              "key": {
                "element": "string",
                "content": "foo"
              },
              "value": {
                "element": "object",
                "attributes": {
                  "samples": [
                    [
                      {
                        "element": "member",
                        "content": {
                          "key": {
                            "element": "string",
                            "content": "bar"
                          },
                          "value": {
                            "element": "string",
                            "content": "baz"
                          }
                        }
                      }
                    ]
                  ]
                },
                "content": []
              }
            }
          }
        ]
      };

      processedRefractElement = preprocess(refractElement);
    });

    it('First sample element has been processed', () => {
      assert.deepEqual(
        processedRefractElement.content[0].content.value.attributes,
        {
          "samples": [
            [
              {
                "element": "member",
                "content": {
                  "key": {
                    "element": "string",
                    "content": "bar"
                  },
                  "value": {
                    "element": "string",
                    "content": "baz"
                  }
                }
              }
            ]
          ]
        },
      );
    });
  });
});
