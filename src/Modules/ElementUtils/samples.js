import { MissingCacheObjectException } from '../../Exceptions/MissingCacheObject';

function hasSamples(element) {
  if (!element) {
    return false;
  }

  if (!element.cache) {
    throw new MissingCacheObjectException();
  }

  return element.cache.hasSamples;
}

export {
  hasSamples,
};
