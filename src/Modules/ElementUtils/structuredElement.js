import some from 'lodash/some';
import { MissingCacheObjectException } from '../../Exceptions/MissingCacheObject';

function containsSelectElement(element) {
  if (!element || !element.content) {
    return false;
  }

  if (!element.cache) {
    throw new MissingCacheObjectException(element);
  }

  return some(element.content, (nestedElement) =>
    nestedElement.cache.isSelect
  );
}

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
  containsSelectElement,
  containsStructuredElement,
  isStructured,
};
