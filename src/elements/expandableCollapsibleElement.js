import React from 'react';
import classNames from 'classnames';

import Value from 'Value/Value';
import Attribute from 'Attribute/Attribute';

import {
  getValueType,
  isObjectOrArrayOrEnum,
  isObject,
  isArray,
  isEnum,
  isMember,
} from 'elements/element';

function isExpandableCollapsible(element) {
  const valueType = getValueType(element);
  return isObject(valueType) || isArray(valueType) || isEnum(valueType);
}

// Alias
const isStructured = isExpandableCollapsible;

function containsExpandableCollapsibleElement(elements) {
  return elements.some((element) => isExpandableCollapsible(element));
}

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

  if (isObjectOrArrayOrEnum(element.element)) {
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
  isExpandableCollapsible,
  isStructured,
  containsArray,
  containsObject,
};
