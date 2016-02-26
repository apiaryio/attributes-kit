import clone from 'lodash/clone';
import cloneDeep from 'lodash/cloneDeep';
import compact from 'lodash/compact';
import eidolon from 'eidolon';
import isArray from 'lodash/isArray';
import isUndefined from 'lodash/isUndefined';
import map from 'lodash/map';
import React from 'react';

import Attribute from '../Attribute/Attribute';

import {
  isInherited,
  isIncluded,
} from '../elements/element';

class Attributes extends React.Component {
  static propTypes = {
    dataStructures: React.PropTypes.array,
    element: React.PropTypes.object,
    theme: React.PropTypes.object,
    dereference: React.PropTypes.bool,
  };

  constructor(props) {
    super(props);

    const {
      dereferencedElement,
      element,
      showInherited,
      showIncluded,
    } = this.processProps(props);

    this.state = {
      dereferencedElement,
      element,
      showInherited,
      showIncluded,
    };
  };

  componentWillReceiveProps(nextProps) {
    const {
      dereferencedElement,
      element,
      showInherited,
      showIncluded,
    } = this.processProps(nextProps);

    this.setState({
      dereferencedElement,
      element,
      showInherited,
      showIncluded,
    });
  };

  processProps(props) {
    let element = props.element;
    let dereferencedElement = null;

    const dataStructures = props.dataStructures || [];

    // Set default value of `showInherited` and `showIncluded` options.
    // If a user hasn't provided the values, we default to true (= we'll render
    // the whole data structure including inherited and included members).
    let showInherited = props.showInherited;
    let showIncluded = props.showIncluded;

    if (isUndefined(showInherited)) {
      showInherited = true;
    }

    if (isUndefined(showIncluded)) {
      showIncluded = true;
    }

    // Regardless of the options above, we have to resolve all references,
    // otherwise we wouldn't be able to render the element. Dereferencing turns
    // `{ element: 'MyObject', ... }` into `{ element: 'object', ... }`,
    // which is something Attributes Kit understands.
    const structures = {};

    for (const item of dataStructures) {
      structures[item.meta.id] = item;
    }

    // Dereference the element. This overwrites the original
    // value with the normalized result. Reference information
    // is still available in the `meta.ref` properties.
    dereferencedElement = cloneDeep(element);
    dereferencedElement = eidolon.dereference(element, structures);

    // If `showInherited`, or `showIncluded` is set to `false`,
    // we'll removed all inherited, or included members from the data strcuture.
    if (showInherited && showIncluded) {
      element = dereferencedElement;
    } else {
      element = this.removeInheritedOrIncludedMembers(dereferencedElement, {
        removeInherited: !showInherited,
        removeIncluded: !showIncluded,
      });
    }

    return {
      dereferencedElement,
      element,
      showIncluded,
      showInherited,
    };
  };

  removeInheritedOrIncludedMembers(element, options) {
    const { removeInherited, removeIncluded } = options;

    if (!isArray(element.content)) {
      return element;
    }

    const modifiedElement = clone(element);

    // Initially I would use `Array.filter`, but since we
    // want to recursively remove inherited properties,
    // we (may) mutate each element.
    //
    // If an element has been inherited/included, we'll
    // remove it from the output based on the provided options.
    modifiedElement.content = map(element.content, (nestedElement) => {
      if (removeInherited && isInherited(nestedElement)) {
        return false;
      }

      if (removeIncluded && isIncluded(nestedElement)) {
        return false;
      }

      if (!isArray(nestedElement.content)) {
        if (removeInherited && isInherited(nestedElement.content.value)) {
          return false;
        } else if (removeIncluded && isIncluded(nestedElement.content.value)) {
          return false;
        }

        return nestedElement;
      }

      return this.removeInheritedOrIncludedMembers(nestedElement, options);
    });

    // This removes all falsey values (false, null, 0, '', ...).
    modifiedElement.content = compact(modifiedElement.content);

    return modifiedElement;
  };

  render() {
    if (!this.props.element) {
      console.error(
        new Error(`
          Please provide the ‘element’ prop (‘<Attributes element="" />’)
          to the Attributes Kit.
        `)
      );

      return null;
    }

    return (
      <div>
        <div>
          <h1>Attributes</h1>
        </div>

        <div>
          <Attribute
            element={this.state.element}
            theme={this.props.theme}
          />
        </div>
      </div>
    );
  };
}

export default Attributes;
