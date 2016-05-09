function isLastArrayItem(arrayElement, currentArrayItemIndex) {
  const numberOfArrayItems = arrayElement.content.length;
  return (numberOfArrayItems - 1) === currentArrayItemIndex;
}
