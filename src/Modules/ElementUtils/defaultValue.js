import isUndefined from 'lodash/isUndefined';
import { MissingCacheObjectException } from '../../Exceptions/MissingCacheObject';
import { isMember } from './type';

function hasDefault(element) {
  if (!element) {
    return false;
  }

  if (!element.cache) {
    throw new MissingCacheObjectException(element);
  }

  if (!isMember(element) || isUndefined(element.content.value)) {
    return element.cache.hasDefault;
  }

  return element.content.value.cache.hasDefault;
}

export {
  hasDefault,
};
