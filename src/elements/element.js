import isEmpty from 'lodash/isEmpty';
import isString from 'lodash/isString';
import sift from 'sift';
import every from 'lodash/every';

import TYPES from '../types';

import { QUERIES } from '../queries';

const inheritedMemberQuery = QUERIES.inheritedMember.query;

function findElement(elementId, dataStructures) {
  const query = {
    'meta.id': elementId,
  };

  const results = sift(query, dataStructures);

  if (isEmpty(results)) {
    return null;
  }

  return results[0];
}

function findParent(elementId, dataStructures) {
  const element = findElement(elementId, dataStructures);

  return findElement(element.meta.ref, dataStructures);
}

function isInherited(element) {
  const results = sift(inheritedMemberQuery, [element]);
  return results.length > 0;
}

const includedMemberQuery = QUERIES.includedMember.query;

function isIncluded(element) {
  const results = sift(includedMemberQuery, [element]);
  return results.length > 0;
}

function getReference(element) {
  if (!element || !element.content || !element.content.value) {
    return null;
  }

  const nestedElement = element.content.value;

  if (!nestedElement) {
    return null;
  }

  if (isEmpty(nestedElement.content)) {
    return null;
  }

  let ref;

  const isElementReferenced = every(nestedElement.content, (childElement) => {
    if (!childElement.meta || !childElement.meta.ref) {
      return false;
    }

    if (!ref) {
      ref = childElement.meta.ref;
      return true;
    }

    return childElement.meta.ref === ref;
  });

  if (isElementReferenced && ref) {
    return ref;
  }

  return null;
}

function isReferenced(element) {
  return !!getReference(element);
}

function isMember(element) {
  if (!element) {
    return false;
  }

  if (element.element) {
    return element.element === TYPES.MEMBER;
  }

  return element === TYPES.MEMBER;
}

function getValueType({ element, content }) {
  if (isMember(element)) {
    return content.value.element;
  }

  return element;
}

function getType(element) {
  if (isMember(element.element)) {
    return getValueType(element);
  }

  return element.element;
}

function hasType(element) {
  if (!element) {
    return false;
  }

  return !!getType(element);
}

function isObject(element) {
  if (!element) {
    return false;
  }

  if (isString(element)) {
    return element === TYPES.OBJECT;
  }

  if (element.element) {
    return getType(element) === TYPES.OBJECT;
  }

  return false;
}

function isArray(element) {
  if (!element) {
    return false;
  }

  if (isString(element)) {
    return element === TYPES.ARRAY;
  }

  if (element.element) {
    return getType(element) === TYPES.ARRAY;
  }

  return false;
}

function isEnum(element) {
  if (!element) {
    return false;
  }

  if (isString(element)) {
    return element === TYPES.ENUM;
  }

  if (element.element) {
    return getType(element) === TYPES.ENUM;
  }

  return false;
}

function isSelect(element) {
  if (!element) {
    return false;
  }

  if (isString(element)) {
    return element === TYPES.SELECT;
  }

  if (element.element) {
    return getType(element) === TYPES.SELECT;
  }

  return false;
}

function isObjectOrArray(element) {
  return isObject(element) || isArray(element);
}

function isObjectOrArrayOrEnum(element) {
  return isObject(element) || isArray(element) || isEnum(element);
}

function hasSamples(element) {
  if (!element) {
    return false;
  }

  if (!element.attributes) {
    return false;
  }

  return !isEmpty(element.attributes.samples);
}

function hasMembers(element) {
  return !isEmpty(element.content);
}

function hasDefaults(element) {
  if (!element) {
    return false;
  }

  if (!element.attributes) {
    return false;
  }

  return !!element.attributes.default;
}

function hasDescription(element) {
  if (element.meta) {
    if (element.meta.description) {
      return true;
    }
  }

  return false;
}

function hasValue(element) {
  if (!element) {
    return false;
  }

  if (isObjectOrArray(element.element)) {
    return false;
  }

  if (!element.content) {
    return false;
  }

  if (isMember(element.element)) {
    if (element.content.value && isObjectOrArray(element.content.value.element)) {
      return false;
    }

    if (!element.content.value.content) {
      return false;
    }
  }

  return true;
}


function isLastArrayItem(arrayElement, currentArrayItemIndex) {
  const numberOfArrayItems = arrayElement.content.length;
  return (numberOfArrayItems - 1) === currentArrayItemIndex;
}

export {
  findElement,
  findParent,
  getReference,
  getType,
  getValueType,
  hasDefaults,
  hasDescription,
  hasMembers,
  hasSamples,
  hasType,
  hasValue,
  isArray,
  isEnum,
  isIncluded,
  isInherited,
  isLastArrayItem,
  isMember,
  isObject,
  isObjectOrArray,
  isObjectOrArrayOrEnum,
  isReferenced,
  isSelect,
};
