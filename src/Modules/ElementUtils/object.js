import isEmpty from 'lodash/isEmpty';

function hasProperties(element) {
  if (!element) {
    return false;
  }

  return !isEmpty(element.content);
}

export {
  hasProperties,
};
