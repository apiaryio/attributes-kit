/*
 * Preprocessor utility functions.
 */

export function setCache(refract, name, value) {
  if (refract.cache === undefined) {
    refract.cache = {};
  }

  refract.cache[name] = value;
}
