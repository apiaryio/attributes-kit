import React from 'react';

import ValueComponent from 'Value/Value';
import AttributeComponent from 'Attribute/Attribute';

import {
  getValueType,
  isObjectOrArray
} from 'elements/element';


const isExpandableAndCollapsible = (element) => {
  const valueType = getValueType(element);
  return isObjectOrArray(valueType);
};

// If the value is an object or an array, the component
// does support expand/collapse functionality. In order
// to support such functionality we have to attach
// respective class names to the `.attributeObjectMemeber`
// element.
//
// `expanded`/`collapsed` to indicate the current state;
// `isObject`/`isArray` to state the type of the value, as
// each has a different background color; and so on.
const getExpandCollapseClassNames = (element, state, classNamesToConcat) => {
  const classNames = ['isExpandableCollapsible'];

  const valueType = getValueType(element);

  // Attach a class name indicating a type of the value,
  // e.g. `isObject`, `isArray`.
  classNames.push(`
    is${valueType.charAt(0).toUpperCase() + valueType.substr(1)}
  `);

  if (!state) {
    classNames.push('isExpanded');
  } else if (state && state.isExpanded) {
    classNames.push('isExpanded');
  } else {
    classNames.push('isCollapsed');
  }

  if (classNamesToConcat) {
    return classNamesToConcat.concat(classNames);
  }

  return classNames;
};

const getValue = (element) => {
  let value;

  if (isObjectOrArray(element.element)) {
    value = <AttributeComponent data={element} />;
  } else if (element.element === 'member') {
    if (isObjectOrArray(element.content.value.element)) {
      value = <AttributeComponent data={element.content.value} />;
    } else if (element.content.value.content) {
      value = <ValueComponent value={element.content.value.content} />;
    } else {
      value = false;
    }
  } else if (element.content) {
    value = <ValueComponent value={element.content} />;
  } else {
    value = false;
  }

  return value;
};


export {
  isExpandableAndCollapsible,
  getExpandCollapseClassNames,
  getValue
};
