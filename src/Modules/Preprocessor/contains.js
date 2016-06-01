import { setCache } from './utilities';

// This assumes that `cache.isStructured` has already
// been set on any child elements!
export function structuredElement(refract) {
  let containsStructured = false;

  if (refract && refract.content && refract.content.length) {
    for (const item of refract.content) {
      if (item.cache && item.cache.isStructured) {
        containsStructured = true;
        break;
      }
    }
  }

  setCache(refract, 'containsStructuredElement', containsStructured);
}
