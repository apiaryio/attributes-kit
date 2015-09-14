import TYPES from 'types';

let getValueType = function({element, content}) {
  if (element === 'member') {
    return content.value.element;
  }

  return element;
};

let isObject = function(element) {
  return element === TYPES.OBJECT;
};

let isArray = function(element) {
  return element === TYPES.ARRAY;
};

let isObjectOrArray = function(element) {
  return (element === TYPES.OBJECT) || (element === TYPES.ARRAY);
};

export {
  getValueType,
  isObject,
  isArray,
  isObjectOrArray
};
