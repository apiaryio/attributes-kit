import { MissingCacheObjectException } from '../../Exceptions/MissingCacheObject';
import { TYPES } from '../../Resources/types';
import isUndefined from 'lodash/isUndefined';

function isObject(element) {
  if (!element) {
    return false;
  }

  if (!element.cache) {
    throw new MissingCacheObjectException(element);
  }

  return element.cache.isObject;
}

function isArray(element) {
  if (!element) {
    return false;
  }

  if (!element.cache) {
    throw new MissingCacheObjectException(element);
  }

  return element.cache.isArray;
}

function isEnum(element) {
  if (!element) {
    return false;
  }

  if (!element.cache) {
    throw new MissingCacheObjectException(element);
  }

  return element.cache.isEnum;
}

function isSelect(element) {
  if (!element) {
    return false;
  }

  if (!element.cache) {
    throw new MissingCacheObjectException(element);
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

function isMember(element) {
  if (!element) {
    return false;
  }

  if (element.element) {
    return element.element === TYPES.MEMBER;
  }

  return element === TYPES.MEMBER;
}

function getTypeOfValue(element) {
  if (isMember(element.element)) {
    if (isUndefined(element.content.value)) { return 'nullable'; };

    return element.content.value.element;
  }

  return element.element;
}

function getType(element) {
  if (isMember(element.element)) {
    return getTypeOfValue(element);
  }

  return element.element;
}

function hasType(element) {
  if (!element) {
    return false;
  }

  return !!getType(element);
}

export {
  getType,
  getTypeOfValue,
  hasType,
  isArray,
  isArrayOrEnum,
  isArrayOrEnumOrSelect,
  isEnum,
  isMember,
  isObject,
  isObjectOrArray,
  isObjectOrArrayOrEnum,
  isSelect,
};
