import TYPES from 'types';

const isMember = (element) => {
  return element === TYPES.MEMBER;
};

const getValueType = ({element, content}) => {
  if (isMember(element)) {
    return content.value.element;
  }

  return element;
};

const getType = (element) => {
  if (isMember(element.element)) {
    return getValueType(element);
  }

  return element.element;
};

const isObject = (element) => {
  return element === TYPES.OBJECT;
};

const isArray = (element) => {
  return element === TYPES.ARRAY;
};

const isObjectOrArray = (element) => {
  return isObject(element) || isArray(element);
};

export {
  getValueType,
  getType,
  isMember,
  isObject,
  isArray,
  isObjectOrArray
};
