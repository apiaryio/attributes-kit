import { assert } from 'chai';

import Description from '../Description';

describe('Description', () => {
  describe('get description()', () => {
    describe('Description is a string', () => {
      it('Returns the string', () => {
        const description = Description.getDescription.apply(
          Description.prototype,
          [
            {
              meta: {
                description: 'Lorem ipsum dolor isamet.',
              },
            },
          ]
        );

        assert.strictEqual(description, 'Lorem ipsum dolor isamet.');
      });
    });

    describe('Description is an element', () => {
      it('Returns the string', () => {
        const description = Description.getDescription.apply(
          Description.prototype,
          [
            {
              meta: {
                description: {
                  element: 'string',
                  content: 'Lorem ipsum dolor isamet.',
                },
              },
            },
          ]
        );

        assert.strictEqual(description, 'Lorem ipsum dolor isamet.');
      });
    });
  });
});
