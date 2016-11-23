import { MissingCacheObjectException } from '../../Exceptions/MissingCacheObject';
import { isMember } from './type';

function hasDefault(element) {
  if (!element) {
    return false;
  }

  if (!element.cache) {
    throw new MissingCacheObjectException(element);
  }

  if (isMember(element)) {
    return element.content.value.cache.hasDefault;
  }

  return element.cache.hasDefault;
}

export {
  hasDefault,
};
