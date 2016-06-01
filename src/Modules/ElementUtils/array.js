import isEmpty from 'lodash/isEmpty';

function isLastArrayItem(arrayElement, currentArrayItemIndex) {
  if (!arrayElement || typeof currentArrayItemIndex === 'undefined') {
    return false;
  }

  const numberOfArrayItems = arrayElement.content.length;

  return (numberOfArrayItems - 1) === currentArrayItemIndex;
}

function hasItems(element) {
  if (!element) {
    return false;
  }

  return !isEmpty(element.content);
}

export {
  isLastArrayItem,
  hasItems,
};
