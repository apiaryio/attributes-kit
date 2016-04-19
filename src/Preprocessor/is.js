import every from 'lodash/every';
import isEmpty from 'lodash/isEmpty';
import sift from 'sift';
import TYPES from '../types';

import {QUERIES} from '../queries';
import {setCache} from './utilities';

const {includedMember, inheritedMember} = QUERIES;

function isType(refract, type) {
  let isType = false;

  if (refract) {
    if (refract === type) {
      isType = true;
    }

    if (refract.element === type) {
      isType = true;
    } else if (refract.element === 'member') {
      // This is a member of an object, so we really care about the
      // type of its value, e.g. `string` rather than `member`.
      if (refract.content && refract.content.value && refract.content.value.element === type) {
        isType = true;
      }
    }
  }

  return isType;
}

export function arrayType(refract) {
  setCache(refract, 'isArray', isType(refract, TYPES.ARRAY));
}

export function enumType(refract) {
  setCache(refract, 'isEnum', isType(refract, TYPES.ENUM));
}

export function selectType(refract) {
  setCache(refract, 'isSelect', isType(refract, TYPES.SELECT));
}

export function objectType(refract) {
  setCache(refract, 'isObject', isType(refract, TYPES.OBJECT));
}

export function included(refract) {
  const results = sift(includedMember.query, [refract]);
  const isIncluded = results.length > 0;

  setCache(refract, 'isIncluded', isIncluded);
}

export function inherited(refract) {
  const results = sift(inheritedMember.query, [refract]);
  const isInherited = results.length > 0;

  setCache(refract, 'isInherited', isInherited);
}

// Note: this check depends on the type checks above to have
// been run first!
export function structured(refract) {
  const isStructured =
    refract.cache.isObject || refract.cache.isArray ||
    refract.cache.isEnum || refract.cache.isSelect;
  setCache(refract, 'isStructured', isStructured);
}

export function referenced(refract) {
  let isReferenced = false;

  if (refract && refract.content && refract.content.value) {
    const nestedElement = refract.content.value;

    if (!isEmpty(nestedElement.content)) {
      let ref;

      isReferenced = every(nestedElement.content, (childElement) => {
        if (!childElement.meta || !childElement.meta.ref) {
          return false;
        }

        if (!ref) {
          ref = childElement.meta.ref;
          return true;
        }

        return childElement.meta.ref === ref;
      });
    }
  }

  setCache(refract, 'isReferenced', isReferenced);
}
