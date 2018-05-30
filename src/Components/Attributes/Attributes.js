import abagnale from 'abagnale/lib/abagnale';
import cloneDeep from 'lodash/cloneDeep';
import eidolon from 'eidolon';
import minim from 'minim';
import JSON06Serialiser from 'minim/lib/serialisers/json-0.6';
import { EventEmitter } from 'fbemitter';
import isUndefined from 'lodash/isUndefined';
import isArray from 'lodash/isArray';
import isFunction from 'lodash/isFunction';
import isObject from 'lodash/isObject';
import map from 'lodash/map';
import merge from 'lodash/merge';
import React from 'react';
import PropTypes from 'prop-types';
import reduce from 'lodash/reduce';
import { Style } from 'radium';

import Attribute from '../Attribute/Attribute';
import Title from '../Title/Title';
import { DEFAULT_FONT_FAMILY } from '../../Constants/fonts';

import { preprocess } from '../../Modules/Preprocessor/Preprocessor';
import { preprocessSamples } from '../../Modules/SamplesPreprocessor/SamplesPreprocessor';

import defaultTheme from '../../Resources/theme';


class Attributes extends React.Component {
  static propTypes = {
    namedTypes: PropTypes.bool,
    collapseByDefault: PropTypes.bool,
    dataStructures: PropTypes.array,
    element: PropTypes.object,
    includedProperties: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
    ]),
    inheritedProperties: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
    ]),
    maxInheritanceDepth: PropTypes.any,
    onElementLinkClick: PropTypes.func,
    title: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
    ]),
    theme: PropTypes.object,
  };

  static defaultProps = {
    includedProperties: 'show',
    inheritedProperties: 'show',
  };

  static childContextTypes = {
    dereferencedDataStructures: PropTypes.array,
    theme: PropTypes.object,
    element: PropTypes.object,
    namedTypes: PropTypes.bool,
    eventEmitter: PropTypes.object,
    onElementLinkClick: PropTypes.func,
    includedProperties: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
    ]),
    inheritedProperties: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
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
    let dataStructures = props.dataStructures || [];
    let element = props.element;

    if (isFunction(element.getMetaProperty)) {
      // serialize minim Element inputs (`element` and `dataStructures`)
      // to the expected refract 0.6 serialization
      const refractSerializer = new JSON06Serialiser(minim.namespace());
      element = refractSerializer.serialise(element).content[0];
      dataStructures = dataStructures.map(d => refractSerializer.serialise(d).content[0]);
    }


    // We have to resolve all references, otherwise we wouldn't be able to
    // render the element. Dereferencing turns `{ element: 'MyObject', ... }`
    // into `{ element: 'object', ... }`, which is something Attributes Kit
    // understands.
    //
    // First, let's build index of the data structure elements in the following
    // format—`[dataStructure.meta.id]: dataStructureElement`, where
    // `dataStructure.meta.id` is name of the data structure.
    const dataStructuresIndex = props.dataStructuresIndex || (
      reduce(dataStructures, (result, dataStructure) => {
        if (typeof dataStructure.meta.id === 'object') {
          result[dataStructure.meta.id.content] = dataStructure;
        } else {
          result[dataStructure.meta.id] = dataStructure;
        }

        return result;
      }, {})
    );

    const dereferencedDataStructures = props.dereferencedDataStructures || (
      map(dataStructures, (dataStructure) =>
        eidolon.dereference(
          cloneDeep(dataStructure), dataStructuresIndex
        )
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
      cloneDeep(element)
    );

    // Dereference the element. This overwrites the original
    // value with the normalized result. Reference information
    // is still available in the `meta.ref` properties.
    const dereferencedElement = eidolon.dereference(
      originElement,
      dataStructuresIndex
    );

    element = abagnale.forge([dereferencedElement], { separator: '.' })[0];

    preprocessSamples(element);
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
    const DESCRIPTION_COLOR = this.state.theme.DESCRIPTION_COLOR;

    return (
      <div className="attributesKit">
        {
          this.state.title &&
            <Title element={this.state.element} />
        }

        <Style
          scopeSelector=".attributesKit"
          rules={{
            p: {
              marginBottom: '4px',
              fontFamily: DEFAULT_FONT_FAMILY,
              fontSize: '14px',
              color: DESCRIPTION_COLOR,
              lineHeight: '21px',
              fontWeight: 'regular',
            },
            'p:last-child': {
              marginBottom: '0px',
            },
            ul: {
              marginLeft: '20px',
            },
            a: {
              color: '#747E8E',
              textDecoration: 'none',
              borderBottom: '1px solid #DCE0E8',
            },
            'a:hover': {
              borderBottom: 'none',
            },
          }}
        />

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
