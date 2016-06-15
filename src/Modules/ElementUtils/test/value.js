import assert from 'assert';

import { hasValue } from '../value.js';

describe('#hasValue', () => {
  context('Element is not defined', () => {
    it('It returns false', () => {
      assert.strictEqual(
        hasValue(undefined),
        false
      );
    });
  });

  context('Element is an object', () => {
    it('It returns false', () => {
      assert.strictEqual(
        hasValue({
          cache: {
            isObject: true,
          },
          element: 'object',
          content: [],
        }),
        false
      );
    });
  });

  context('Element is an array', () => {
    it('It returns false', () => {
      assert.strictEqual(
        hasValue({
          cache: {
            isArray: true,
          },
          element: 'array',
          content: [],
        }),
        false
      );
    });
  });

  context('Content is set to ‘false’', () => {
    it('It returns true', () => {
      assert.strictEqual(
        hasValue({
          cache: {},
          content: false,
        }),
        true
      );
    });
  });

  context('Content is set to ‘0’', () => {
    it('It returns true', () => {
      assert.strictEqual(
        hasValue({
          cache: {},
          content: 0,
        }),
        true
      );
    });
  });

  context('Element is a member', () => {
    context('Content is set to ‘false’', () => {
      it('It returns true', () => {
        assert.strictEqual(
          hasValue({
            cache: {},
            element: 'member',
            content: {
              value: {
                cache: {},
                element: 'boolean',
                content: false,
              },
            },
          }),
          true
        );
      });
    });

    context('Content is set to ‘0’', () => {
      it('It returns true', () => {
        assert.strictEqual(
          hasValue({
            cache: {},
            element: 'member',
            content: {
              value: {
                cache: {},
                element: 'number',
                content: 0,
              },
            },
          }),
          true
        );
      });
    });

    context('Content is set to a number', () => {
      it('It returns true', () => {
        assert.strictEqual(
          hasValue({
            cache: {},
            element: 'member',
            content: {
              value: {
                cache: {},
                element: 'number',
                content: 123,
              },
            },
          }),
          true
        );
      });
    });
  });
});
