function MissingCacheObjectException(element) {
  this.name = 'MissingCacheObjectException';

  this.message = `
    The element is missing the ‘cache’ object. Please check that the the Refract
    tree has been preprocessed.

    Element is ‘${JSON.stringify(element)}’.
  `;
}

function isObject(element) {
  if (!element) {
    return false;
  }

  if (!element.cache) {
    throw MissingCacheObjectException(element);
  }

  return element.cache.isObject;
}

function isArray(element) {
  if (!element) {
    return false;
  }

  if (!element.cache) {
    throw MissingCacheObjectException(element);
  }

  return element.cache.isArray;
}

function isEnum(element) {
  if (!element) {
    return false;
  }

  if (!element.cache) {
    throw MissingCacheObjectException(element);
  }

  return element.cache.isEnum;
}

function isSelect(element) {
  if (!element) {
    return false;
  }

  if (!element.cache) {
    throw MissingCacheObjectException(element);
  }

  return element.cache.isSelect;
}

function isObjectOrArray(element) {
  return isObject(element) || isArray(element);
}

function isObjectOrArrayOrEnum(element) {
  return isObject(element) || isArray(element) || isEnum(element);
}

function isArrayOrEnum(element) {
  return isArray(element) || isEnum(element);
}

function isArrayOrEnumOrSelect(element) {
  return isArray(element) || isEnum(element) || isSelect(element);
}


import every from 'lodash/every';

import TYPES from '../types';

import { QUERIES } from '../queries';






function isMember(element) {
  if (!element) {
    return false;
  }

  if (element.element) {
    return element.element === TYPES.MEMBER;
  }

  return element === TYPES.MEMBER;
}

function hasType(element) {
  if (!element) {
    return false;
  }

  return !!getType(element);
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

export {
  isArray,
  isArrayOrEnum,
  isArrayOrEnumOrSelect,
  isEnum,
  isObject,
  isObjectOrArray,
  isObjectOrArrayOrEnum,
  isSelect,
};
