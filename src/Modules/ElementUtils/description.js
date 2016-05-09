import {MissingCacheObjectException} from '../../Exceptions/MissingCacheObject';

function hasDescription(element) {
  if (!element) {
    return false;
  }

  if (!element.cache) {
    throw new MissingCacheObjectException(element);
  }

  return element.cache.hasDescription;
}

export {
  hasDescription,
};
