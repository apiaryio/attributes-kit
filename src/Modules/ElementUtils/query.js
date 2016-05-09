import isEmpty from 'lodash/isEmpty';
import sift from 'sift';

function findElement(elementId, dataStructures) {
  const query = {
    'meta.id': elementId,
  };

  const results = sift(query, dataStructures);

  if (isEmpty(results)) {
    return null;
  }

  return results[0];
}

function findParent(elementId, dataStructures) {
  const element = findElement(elementId, dataStructures);

  return findElement(element.meta.ref, dataStructures);
}

export {
  findElement,
  findParent,
};
