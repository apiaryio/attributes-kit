import { assert } from 'chai';
import cloneDeep from 'lodash/cloneDeep';

import Attributes from '../Attributes';
import defaultTheme from '../../theme';

describe('Attributes', () => {
  describe('#processProps', () => {
    describe('It doesn\'t mutate the default theme', () => {
      let expectedDefaultTheme;

      before(() => {
        expectedDefaultTheme = cloneDeep(defaultTheme);

        Attributes.prototype.processProps.apply(
          null,
          [
            {
              theme: {
                KEY_COLOR: 'red',
              },
              element: [],
            },
          ]
        );
      });

      it('Default theme has not been mutated', () => {
        assert.deepEqual(defaultTheme, expectedDefaultTheme);
      });
    });
  });
});
