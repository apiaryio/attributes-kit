/*
 * Refract Preprocessor
 * Adds useful shortcut information and otherwise processes refract structures
 * so that rendering elements via React components is simpler.
 */

import * as contains from './contains';
import * as has from './has';
import * as is from './is';

function processElement(refract) {
  if (refract.cache) {
    // This item has already been preprocessed!
    // You can force reprocessing by deleting `refract.cache`.
    return;
  }

  // First, set various things on the element
  has.defaultValue(refract);
  has.samples(refract);
  has.description(refract);

  is.arrayType(refract);
  is.enumType(refract);
  is.selectType(refract);
  is.objectType(refract);

  is.included(refract);
  is.inherited(refract);

  is.structured(refract);
  is.referenced(refract);

  // Then, see if it has children and process each of the children as well!
  if (refract.content) {
    if (refract.element === 'member' && refract.content.value) {
      // This is a member of an object
      processElement(refract.content.value);
    } else if (refract.content.length && refract.content[0].element) {
      // This is an array of items
      for (const item of refract.content) {
        processElement(item);
      }
    }
  }

  // This must be done *AFTER* all children are processed, because it
  // depends on values set in the loop above.
  contains.structuredElement(refract);
}

export class Preprocessor {
  constructor(refract) {
    this.refract = refract;
  }

  process() {
    processElement(this.refract);

    return this;
  }

  value() {
    return this.refract;
  }
}

export function preprocess(refract) {
  return new Preprocessor(refract).process().value();
}
