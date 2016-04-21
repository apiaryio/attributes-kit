import abagnale from 'abagnale/lib/abagnale';
import cloneDeep from 'lodash/cloneDeep';
import eidolon from 'eidolon';
import { EventEmitter } from 'fbemitter';
import isUndefined from 'lodash/isUndefined';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import map from 'lodash/map';
import merge from 'lodash/merge';
import React from 'react';
import reduce from 'lodash/reduce';

import Attribute from '../Attribute/Attribute';
import Title from '../Title/Title';
import {preprocess} from '../Preprocessor/Preprocessor';

import defaultTheme from '../theme';

class Attributes extends React.Component {
  static propTypes = {
    namedTypes: React.PropTypes.bool,
    collapseByDefault: React.PropTypes.bool,
    dataStructures: React.PropTypes.array,
    element: React.PropTypes.object,
    includedProperties: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.string,
    ]),
    inheritedProperties: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.string,
    ]),
    maxInheritanceDepth: React.PropTypes.any,
    onElementLinkClick: React.PropTypes.func,
    title: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.string,
    ]),
    theme: React.PropTypes.object,
  };

  static childContextTypes = {
    dereferencedDataStructures: React.PropTypes.array,
    theme: React.PropTypes.object,
    element: React.PropTypes.object,
    namedTypes: React.PropTypes.bool,
    eventEmitter: React.PropTypes.object,
    onElementLinkClick: React.PropTypes.func,
    includedProperties: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.string,
    ]),
    inheritedProperties: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.string,
    ]),
  };

  constructor(props) {
    super(props);
    this.state = this.transformPropsIntoState(this.props);
    this.eventEmitter = new EventEmitter();
  };

  getChildContext() {
    return {
      dereferencedDataStructures: this.state.dereferencedDataStructures,
      eventEmitter: this.eventEmitter,
      includedProperties: this.state.includedProperties,
      inheritedProperties: this.state.inheritedProperties,
      onElementLinkClick: this.state.onElementLinkClick,
      theme: this.state.theme,
      namedTypes: this.state.namedTypes,
      element: this.state.element,
    };
  };

  componentWillReceiveProps(nextProps) {
    this.setState(
      this.transformPropsIntoState(nextProps)
    );
  };

  alignKeys = () => {
    this.eventEmitter.emit('alignKeys');
  };

  transformPropsIntoState(props) {
    let theme;

    // Make a deep clone of the default theme object
    // to prevent future mutations; then we'll merge in custom theme.
    theme = cloneDeep(defaultTheme);
    theme = merge(theme, props.theme || {});

    // `dataStructures` prop is optional and is used to
    // resolve inheritance, references and includes/mixins, plus to
    // render the inheritance tree.
    const dataStructures = props.dataStructures || [];

    // We have to resolve all references, otherwise we wouldn't be able to
    // render the element. Dereferencing turns `{ element: 'MyObject', ... }`
    // into `{ element: 'object', ... }`, which is something Attributes Kit
    // understands.
    //
    // First, let's build index of the data structure elements in the following
    // format—`[dataStructure.meta.id]: dataStructureElement`, where
    // `dataStructure.meta.id` is name of the data structure.
    const dataStructuresIndex = reduce(dataStructures, (result, dataStructure) => {
      result[dataStructure.meta.id] = dataStructure;
      return result;
    }, {});

    const dereferencedDataStructures = map(dataStructures, (dataStructure) =>
      eidolon.dereference(
        cloneDeep(dataStructure), dataStructuresIndex
      )
    );

    // Set default value of `inheritedProperties` and `includedProperties` options.
    // If a user hasn't provided the values, we default to true (= we'll render
    // the whole data structure including inherited and included properties).
    //
    // Options `showInherited` and `showIncluded` have been deprecated and
    // will be removed in the 1.0 release.
    let inheritedProperties = props.inheritedProperties || props.showInherited;
    let includedProperties = props.includedProperties || props.showIncluded;

    if (isUndefined(inheritedProperties)) {
      inheritedProperties = true;
    }

    if (isUndefined(includedProperties)) {
      includedProperties = true;
    }

    let title;

    if (props.title === 'show') {
      title = true;
    } else if (props.title === 'hide') {
      title = false;
    } else {
      title = true;
    }

    const maxInheritanceDepth = props.maxInheritanceDepth || undefined;

    // Set default value of `collapseByDefault` option. If a user hasn't
    // provided the value, we default to false (= render
    // the whole data structure expanded).
    let collapseByDefault = props.collapseByDefault;

    if (isUndefined(collapseByDefault)) {
      collapseByDefault = false;
    }

    let namedTypes = props.namedTypes;

    if (isUndefined(namedTypes)) {
      namedTypes = false;
    }

    // Set up a dummy handler for element link clicks.
    let onElementLinkClick = props.onElementLinkClick;

    if (isUndefined(onElementLinkClick)) {
      onElementLinkClick = function defaultOnElementLinkClickHandler() {};
    }

    const originElement = this.addNestedLevels(
      cloneDeep(props.element)
    );

    // Dereference the element. This overwrites the original
    // value with the normalized result. Reference information
    // is still available in the `meta.ref` properties.
    const dereferencedElement = eidolon.dereference(
      originElement,
      dataStructuresIndex
    );

    const element = abagnale.forge([dereferencedElement], { separator: '.' })[0];

    preprocess(element);

    return {
      collapseByDefault,
      dereferencedDataStructures,
      element,
      includedProperties,
      inheritedProperties,
      maxInheritanceDepth,
      namedTypes,
      onElementLinkClick,
      theme,
      title,
    };
  };

  addNestedLevels(element, nestedLevel = -1) {
    if (!element) {
      return element;
    }

    if (!element.meta) {
      element.meta = {};
    }

    if (element.content && element.content.value) {
      nestedLevel = nestedLevel + 1;
    }

    element.meta._nestedLevel = nestedLevel;

    if (element.content && isArray(element.content)) {
      element.content = map(element.content, (nestedElement) =>
        this.addNestedLevels(nestedElement, nestedLevel)
      );
    } else if (element.content && isObject(element.content)) {
      element.content.value = this.addNestedLevels(
        element.content.value,
        nestedLevel
      );
    }

    return element;
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
        {
          this.state.title &&
            <Title element={this.state.element} />
        }

        <Attribute
          element={this.state.element}
          theme={this.state.theme}
          collapseByDefault={this.state.collapseByDefault}
        />
      </div>
    );
  };
}

export default Attributes;
