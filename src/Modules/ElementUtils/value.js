import isUndefined from 'lodash/isUndefined';

import { isObjectOrArray, isMember } from './type';

function hasValue(element) {
  if (!element) {
    return false;
  }

  if (isObjectOrArray(element)) {
    return false;
  }

  if (isUndefined(element.content)) {
    return false;
  }

  if (isMember(element.element)) {
    if (!isUndefined(element.content.value) && isObjectOrArray(element.content.value)) {
      return false;
    }

    if (isUndefined(element.content.value)) {
      return false;
    }

    if (isUndefined(element.content.value.content)) {
      return false;
    }
  }

  return true;
}

export {
  hasValue,
};
