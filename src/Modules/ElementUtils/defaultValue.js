import {MissingCacheObjectException} from '../../Exceptions/MissingCacheObject';

function hasDefault(element) {
  if (!element) {
    return false;
  }

  if (!element.cache) {
    throw new MissingCacheObjectException(element);
  }

  return element.cache.hasDefault;
}

export {
  hasDefault,
};
