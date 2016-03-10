import abagnale from 'abagnale/lib/abagnale';
import cloneDeep from 'lodash/cloneDeep';
import compact from 'lodash/compact';
import eidolon from 'eidolon';
import isArray from 'lodash/isArray';
import isUndefined from 'lodash/isUndefined';
import map from 'lodash/map';
import merge from 'lodash/merge';
import React from 'react';

import Attribute from '../Attribute/Attribute';

import defaultTheme from '../theme';

import {
  isInherited,
  isIncluded,
} from '../elements/element';

class Attributes extends React.Component {
  static propTypes = {
    collapseByDefault: React.PropTypes.bool,
    dataStructures: React.PropTypes.array,
    dereference: React.PropTypes.bool,
    element: React.PropTypes.object,
    onElementLinkClick: React.PropTypes.func,
    showIncluded: React.PropTypes.bool,
    showInherited: React.PropTypes.bool,
    showMemberParentLinks: React.PropTypes.bool,
    showParentLinks: React.PropTypes.bool,
    theme: React.PropTypes.object,
  };

  static childContextTypes = {
    theme: React.PropTypes.object,
    showParentLinks: React.PropTypes.bool,
    showMemberParentLinks: React.PropTypes.bool,
    onElementLinkClick: React.PropTypes.func,
  };

  constructor(props) {
    super(props);

    const {
      collapseByDefault,
      dereferencedElement,
      element,
      showIncluded,
      showInherited,
      theme,
      showParentLinks,
      showMemberParentLinks,
      onElementLinkClick,
    } = this.processProps(props);

    this.state = {
      collapseByDefault,
      dereferencedElement,
      element,
      showIncluded,
      showInherited,
      theme,
      showParentLinks,
      showMemberParentLinks,
      onElementLinkClick,
    };
  };

  getChildContext() {
    return {
      theme: this.state.theme,
      showParentLinks: this.state.showParentLinks,
      showMemberParentLinks: this.state.showMemberParentLinks,
      onElementLinkClick: this.state.onElementLinkClick,
    };
  };

  componentWillReceiveProps(nextProps) {
    const {
      collapseByDefault,
      dereferencedElement,
      element,
      showIncluded,
      showInherited,
      theme,
      showParentLinks,
      showMemberParentLinks,
      onElementLinkClick,
    } = this.processProps(nextProps);

    this.setState({
      collapseByDefault,
      dereferencedElement,
      element,
      showIncluded,
      showInherited,
      theme,
      showParentLinks,
      showMemberParentLinks,
      onElementLinkClick,
    });
  };

  processProps(props) {
    let theme;

    // First, make a deep clone of the default theme object
    // to prevent future mutations; then we'll merge in custom theme.
    theme = cloneDeep(defaultTheme);
    theme = merge(theme, props.theme || {});

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

    // Set default value of `collapseByDefault` option. If a user hasn't
    // provided the value, we default to false (= render
    // the whole data structure expanded).
    let collapseByDefault = props.collapseByDefault;

    if (isUndefined(collapseByDefault)) {
      collapseByDefault = false;

    // By default we won't show the parent links, but this can be enabled by
    // the user. It will show the parent element as a link before any element
    // properties/values/defaults/etc. The member items of objects will show
    // parent links by default.
    let showParentLinks = props.showParentLinks;
    let showMemberParentLinks = props.showMemberParentLinks;

    if (isUndefined(showParentLinks)) {
      showParentLinks = false;
    }

    if (isUndefined(showMemberParentLinks)) {
      showMemberParentLinks = true;
    }

    // Set up a dummy handler for element link clicks.
    let onElementLinkClick = props.onElementLinkClick;

    if (isUndefined(onElementLinkClick)) {
      onElementLinkClick = function () {};
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
    const dereferencedElement = eidolon.dereference(
      cloneDeep(props.element),
      structures
    );

    // If `showInherited`, or `showIncluded` is set to `false`,
    // we'll removed all inherited, or included members from the data strcuture.
    const originElement = this.removeInheritedOrIncludedMembers(dereferencedElement, {
      removeInherited: !showInherited,
      removeIncluded: !showIncluded,
    });

    const element = abagnale.forge([originElement], { separator: '.' })[0];

    return {
      collapseByDefault,
      dereferencedElement,
      element,
      showIncluded,
      showInherited,
      theme,
      showParentLinks,
      showMemberParentLinks,
      onElementLinkClick,
    };
  };

  removeInheritedOrIncludedMembers(element, options) {
    const { removeInherited, removeIncluded } = options;

    if (!removeInherited && !removeIncluded) {
      return element;
    }

    if (!isArray(element.content)) {
      return element;
    }

    const modifiedElement = cloneDeep(element);

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

      if (nestedElement.content && !isArray(nestedElement.content)) {
        if (removeInherited && isInherited(nestedElement.content.value)) {
          return false;
        } else if (removeIncluded && isIncluded(nestedElement.content.value)) {
          return false;
        }

        if (nestedElement.content.value && isArray(nestedElement.content.value.content)) {
          nestedElement.content.value = this.removeInheritedOrIncludedMembers(
            nestedElement.content.value, options
          );
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
            theme={this.state.theme}
            collapseByDefault={this.state.collapseByDefault}
          />
        </div>
      </div>
    );
  };
}

export default Attributes;
