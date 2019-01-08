import { assert } from 'chai';
import minim from 'minim';
import minimParseResult from 'minim-parse-result';
import cloneDeep from 'lodash/cloneDeep';

import Attributes from '../Attributes';
import defaultTheme from '../../../Resources/theme';

describe('Attributes', () => {
  describe('#processProps', () => {
    describe('It doesn\'t mutate the default theme', () => {
      let expectedDefaultTheme;

      before(() => {
        expectedDefaultTheme = cloneDeep(defaultTheme);

        Attributes.prototype.transformPropsIntoState.apply(
          Attributes.prototype,
          [
            {
              theme: {
                KEY_COLOR: 'red',
              },
              element: {
                element: 'object',
                meta: {},
                content: [],
              },
            },
          ]
        );
      });

      it('Default theme has not been mutated', () => {
        assert.deepEqual(defaultTheme, expectedDefaultTheme);
      });
    });
  });

  describe('#minimSupport', () => {
    const minimNamespace = minim.namespace().use(minimParseResult);
    const Category = minimNamespace.getElementClass('category');
    const DataStructure = minimNamespace.getElementClass('dataStructure');
    const Element = minimNamespace.getElementClass('element');
    const ReferenceElement = Element.extend({
      /* eslint-disable object-shorthand */
      constructor: function (ref) {
        Element.apply(this, arguments); // eslint-disable-line prefer-rest-params
        this.element = ref.toValue();
      },
    });

    const addressObject = new minim.ObjectElement({
      street: 'Main St.',
      city: 'Prague',
      zip: 11150,
    }, { id: 'Address' });
    const userObject = new minim.ObjectElement({
      name: 'Doe',
      address: new ReferenceElement(addressObject.id),
    }, { id: 'User' });

    const dataStructures = new Category(
      [
        new DataStructure(userObject),
        new DataStructure(addressObject),
      ],
      { classes: ['dataStructures'] }
    );

    describe('It handles minim.Element instance `element` property', () => {
      let addressMember;

      before(() => {
        const state = Attributes.prototype.transformPropsIntoState.apply(
          Attributes.prototype,
          [
            {
              element: dataStructures.first,
            },
          ]
        );
        const refract = state.element;
        addressMember = refract.content.find(e => e.content.key.content === 'address');
      });

      it('It transforms it internally to refract', () => {
        // dataStructure reference
        assert.equal(addressMember.content.value.element, 'Address');
        assert.isFalse(addressMember.cache.isReferenced);
        assert.isFalse(addressMember.content.value.cache.isObject);
      });
    });

    describe('It handles dereferencing properly', () => {
      let addressMember;

      before(() => {
        const state = Attributes.prototype.transformPropsIntoState.apply(
          Attributes.prototype,
          [
            {
              element: dataStructures.first,
              dataStructures,
            },
          ]
        );
        const refract = state.dereferencedDataStructures[0];
        addressMember = refract.content.find(e => e.content.key.content === 'address');
      });

      it('The referenced dataStructure gets dereferenced', () => {
        assert.equal(addressMember.content.value.element, 'object');
        assert.lengthOf(addressMember.content.value.content, 3);
      });
    });

    describe('It handles minim.ArraySlice `dataStructures` property', () => {
      let addressMember;

      before(() => {
        const state = Attributes.prototype.transformPropsIntoState.apply(
          Attributes.prototype,
          [
            {
              element: dataStructures.first,
              dataStructures: dataStructures.filter(ds => !!ds),
            },
          ]
        );
        const refract = state.element;
        addressMember = refract.content.find(e => e.content.key.content === 'address');
      });

      it('It recognizes it is minim the referenced dataStructure gets dereferenced', () => {
        assert.equal(addressMember.content.value.element, 'object');
        assert.lengthOf(addressMember.content.value.content, 3);
      });
    });
  });
});
