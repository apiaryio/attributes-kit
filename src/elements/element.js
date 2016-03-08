import isString from 'lodash/isString';
import sift from 'sift';

import TYPES from '../types';

import { QUERIES } from '../queries';

const inheritedMemberQuery = QUERIES.inheritedMember.query;

function isInherited(element) {
  const results = sift(inheritedMemberQuery, [element]);
  return results.length > 0;
}

const includedMemberQuery = QUERIES.includedMember.query;

function isIncluded(element) {
  const results = sift(includedMemberQuery, [element]);
  return results.length > 0;
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
  const attributes = element.attributes;

  if (attributes) {
    return !!attributes.samples;
  }

  return false;
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
  getType,
  getValueType,
  hasDescription,
  hasSamples,
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
  isSelect,
};
