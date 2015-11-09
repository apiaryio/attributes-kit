import React from 'react';
import classNames from 'classnames';

import Value from 'Value/Value';
import Attribute from 'Attribute/Attribute';

import {
  getValueType,
  isNestedObject,
  isObject,
  isArray,
  isMember,
  isEnum,
} from 'elements/element';

function isExpandableCollapsible(element) {
  // Probably this function can be removed.
  const valueType = getValueType(element);
  return isNestedObject(valueType);
}

// Alias
let isStructured = isExpandableCollapsible;

function containsExpandableCollapsibleElement(elements) {
  return elements.some((element) => {
    return isExpandableCollapsible(element);
  });
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
    'isExpanded': state.isExpanded,
    'isCollapsed': !state.isExpanded,
    'isExpandableCollapsible': isExpandableCollapsible(element),
    'isObject': isObject(valueType),
    'isArray': isArray(valueType),
    'isEnum': isEnum(valueType),
  });
}

function getValue(element) {
  let value;
  if (isNestedObject(element.element)) {
    value = <Attribute data={element} />;
  } else if (isMember(element.element)) {
    if (isNestedObject(element.content.value.element)) {
      value = <Attribute data={element.content.value} />;
    } else if (element.content.value.content) {
      value = <Value value={element.content.value.content} />;
    } else {
      value = false;
    }
  } else if (element.content) {
    value = <Value value={element.content} />;
  } else {
    value = false;
  }

  return value;
}


export {
  getExpandCollapseClassNames,
  getValue,
  containsExpandableCollapsibleElement,
  isExpandableCollapsible,
  isStructured,
};
