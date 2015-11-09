import TYPES from 'types';

function isMember(element) {
  if (element.element) {
    return element.element === TYPES.MEMBER;
  }

  return element === TYPES.MEMBER;
}

function getValueType({element, content}) {
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

  if (element.element) {
    return getType(element) === TYPES.OBJECT;
  }

  return element === TYPES.OBJECT;
}

function isArray(element) {
  if (!element) {
    return false;
  }

  if (element.element) {
    return getType(element) === TYPES.ARRAY;
  }

  return element === TYPES.ARRAY;
}

function isEnum(element) {
  if (element.element) {
    return getType(element) === TYPES.ARRAY;
  }

  return element === TYPES.ENUM;
}

function isNestedObject(element) {
  return isObject(element) || isArray(element) || isEnum(element);
function hasSamples(element) {
  const attributes = element.attributes;

  let samples = null;

  if (attributes) {
    return !!attributes.samples;
  } else {
    return false;
  }
}
}

export {
  getValueType,
  getType,
  isMember,
  isEnum,
  isObject,
  isArray,
  isNestedObject,
  hasSamples,
};
