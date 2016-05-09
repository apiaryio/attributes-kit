import isEmpty from 'lodash/isEmpty';
import sift from 'sift';

const INHERITED_MEMBER_QUERY = {
  $or: [
    {
      'meta.links': {
        href: 'http://refract.link/inherited-member/',
        relation: 'origin',
      },
    },
    {
      'meta.links': {
        href: 'http://refract.link/inherited/',
        relation: 'origin',
      },
    },
  ],
};

/**
 * Returns `true` if the element has been inherited from a parent element.
 */
function isInherited(element) {
  if (!element) {
    return false;
  }

  const results = sift(INHERITED_MEMBER_QUERY, [element]);
  return results.length > 0;
}

const INCLUDED_MEMBER_QUERY = {
  'meta.links': {
    href: 'http://refract.link/included-member/',
    relation: 'origin',
  },
},

/**
 * Returns `true` if the element has been included via `+ Include` construct.
 */
function isIncluded(element) {
  if (!element) {
    return false;
  }

  const results = sift(INCLUDED_MEMBER_QUERY, [element]);
  return results.length > 0;
}


function getReference(element) {
  if (!element || !element.content || !element.content.value) {
    return null;
  }

  const nestedElement = element.content.value;

  if (!nestedElement) {
    return null;
  }

  if (isEmpty(nestedElement.content)) {
    return null;
  }

  let ref;

  const isElementReferenced = every(nestedElement.content, (childElement) => {
    if (!childElement.meta || !childElement.meta.ref) {
      return false;
    }

    if (!ref) {
      ref = childElement.meta.ref;
      return true;
    }

    return childElement.meta.ref === ref;
  });

  if (isElementReferenced && ref) {
    return ref;
  }

  return null;
}

function isReferenced(element) {
  return !!getReference(element);
}

export {
  getReference,
  isIncluded,
  isInherited,
  isReferenced,
};
