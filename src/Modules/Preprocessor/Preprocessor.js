/*
 * Refract Preprocessor
 * Adds useful shortcut information and otherwise processes refract structures
 * so that rendering elements via React components is simpler.
 */
import isEmpty from 'lodash/isEmpty';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';

import map from 'lodash/map';

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

  // Then, see if it the element has any samples and process them as well!
  if (refract.attributes && !isEmpty(refract.attributes.samples)) {
    refract.attributes.samples = map(refract.attributes.samples, (sample) => {
      if (isArray(sample)) {
        return map(sample, (sampleElement) => {
          processElement(sampleElement);
          return sampleElement;
        });
      }

      if (isObject(sample)) {
        processElement(sample);
        return sample;
      }

      return sample;
    });
  }
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

  /*
   * Sorts inherited members either as the first members or the last members.
   * This sort is stable. Passing `head` as `true` puts inherited members first,
   * otherwise they go last.
   */
  sortInherited(head = true) {
    if (this.refract && this.refract.content && this.refract.content.length) {
      const inherited = [];
      const others = [];

      let result;

      // We are not using `array.sort(...)` because it may not be stable!
      // The order of items matters because we want to keep the order
      // that was given by the user - it may have semantic meaning.
      for (const item of this.refract.content) {
        if (item.cache && item.cache.isInherited) {
          inherited.push(item);
        } else {
          others.push(item);
        }
      }

      if (head) {
        result = inherited.concat(others);
      } else {
        result = others.concat(inherited);
      }

      this.refract.content = result;
    }

    return this;
  }
}

export function preprocess(refract) {
  return new Preprocessor(refract).process().value();
}
