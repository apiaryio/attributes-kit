function MissingCacheObjectException(element) {
  this.name = 'MissingCacheObjectException';

  this.message = `
    The element is missing the ‘cache’ object. Please check that the the Refract
    tree has been preprocessed.

    Element is ‘${JSON.stringify(element)}’.
  `;
}

export {
  MissingCacheObjectException,
};
