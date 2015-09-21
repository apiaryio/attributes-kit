import TYPES from 'types';

function isMember(element) {
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
  return element === TYPES.OBJECT;
}

function isArray(element) {
  return element === TYPES.ARRAY;
}

function isObjectOrArray(element) {
  return isObject(element) || isArray(element);
}

export {
  getValueType,
  getType,
  isMember,
  isObject,
  isArray,
  isObjectOrArray,
};
