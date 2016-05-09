import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import React from 'react';

import Value from '../Value/Value';
import Attribute from '../Attribute/Attribute';

import {
  getValueType,
  isArray,
  isEnum,
  isMember,
  isObject,
  isSelect,
} from '../elements/element';

function isExpandableCollapsible(element) {
  const valueType = getValueType(element);

  return isObject(valueType) || isArray(valueType) || isEnum(valueType) || isSelect(valueType);
}

// Alias
const isStructured = isExpandableCollapsible;

function containsExpandableCollapsibleElement(elements) {
  if (isEmpty(elements)) {
    return false;
  }

  return elements.some((element) => isExpandableCollapsible(element));
}

// Alias
const containsStructuredElement = containsExpandableCollapsibleElement;

function containsObject(elements) {
  return elements.some((element) => isObject(element));
}

function containsArray(elements) {
  return elements.some((element) => isArray(element));
}

// If the value is an object or an array, the component
// does support expand/collapse functionality. In order
// to support such functionality we have to attach
// respective class names to the `.attributeObjectMember`
// element.
//
// `expanded`/`collapsed` to indicate the current state;
// `isObject`/`isArray` to state the type of the value, as
// each has a different background color; and so on.
function getExpandCollapseClassNames(element, state) {
  const valueType = getValueType(element);
  return classNames({
    isExpanded: state.isExpanded,
    isCollapsed: !state.isExpanded,
    isExpandableCollapsible: isExpandableCollapsible(element),
    isObject: isObject(valueType),
    isArray: isArray(valueType),
  });
}

function getValue(element, props = {}) {
  let value;

  if (isStructured(element.element)) {
    value = (
      <Attribute
        element={element}
        expandableCollapsible={props.expandableCollapsible}
        parentElement={props.parentElement}
      />
    );
  } else if (isMember(element.element)) {
    if (isStructured(element)) {
      value = (
        <Attribute
          element={element.content.value}
          expandableCollapsible={props.expandableCollapsible}
          parentElement={props.parentElement}
        />
      );
    } else if (element.content.value.content) {
      value = (
        <Value value={element.content.value.content} />
      );
    } else {
      value = false;
    }
  } else if (isObject(element) || isArray(element) || isSelect(element) || isEnum(element)) {
    value = (
      <Attribute
        element={element}
        expandableCollapsible={props.expandableCollapsible}
        parentElement={props.parentElement}
      />
    );
  } else if (element.content) {
    value = (
      <Value value={element.content} />
    );
  } else {
    value = false;
  }

  return value;
}

// Alias
const renderValue = getValue;

export {
  getExpandCollapseClassNames,
  getValue,
  renderValue,
  containsExpandableCollapsibleElement,
  containsStructuredElement,
  isExpandableCollapsible,
  isStructured,
  containsArray,
  containsObject,
};