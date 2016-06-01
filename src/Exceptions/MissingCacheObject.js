import dedent from 'dedent';

function MissingCacheObjectException(element) {
  this.name = 'MissingCacheObjectException';

  this.message = dedent`
    The element is missing the ‘cache’ object. Please check that the the Refract \
    tree has been preprocessed. Element is ‘${JSON.stringify(element, null, 2)}’.
  `;
}

MissingCacheObjectException.prototype = new Error;

export {
  MissingCacheObjectException,
};
