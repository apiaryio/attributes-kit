import { assert } from 'chai';
import cloneDeep from 'lodash/cloneDeep';

import Attribute from '../Attribute';
import defaultTheme from '../../theme';

describe('Attribute', () => {
  describe('#getChildContext', () => {
    describe('When called it doesn\'t mutate the default theme', () => {
      let expectedDefaultTheme;

      before(() => {
        expectedDefaultTheme = cloneDeep(defaultTheme);

        Attribute.prototype.getChildContext.apply(
          {
            props: {
              theme: {
                KEY_COLOR: 'red',
              },
            },
          }
        );
      });

      it('Default theme has not been mutated', () => {
        assert.deepEqual(defaultTheme, expectedDefaultTheme);
      });
    });
  });
});
