import { MissingCacheObjectException } from '../../Exceptions/MissingCacheObject';

function containsStructuredElement(element) {
  if (!element) {
    return false;
  }

  if (!element.cache) {
    throw new MissingCacheObjectException(element);
  }

  return element.cache.containsStructuredElement;
}

function isStructured(element) {
  if (!element) {
    return false;
  }

  if (!element.cache) {
    throw new MissingCacheObjectException(element);
  }

  return element.cache.isStructured;
}

export {
  containsStructuredElement,
  isStructured,
};
