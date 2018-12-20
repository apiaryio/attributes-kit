import { MissingCacheObjectException } from '../../Exceptions/MissingCacheObject';
import { isMember } from './type';
import isUndefined from 'lodash/isUndefined';


function hasDefault(element) {
  if (!element) {
    return false;
  }

  if (!element.cache) {
    throw new MissingCacheObjectException(element);
  }

  if (isMember(element) && !isUndefined(element.content.value)) {
    return element.content.value.cache.hasDefault;
  }

  return element.cache.hasDefault;
}

export {
  hasDefault,
};
