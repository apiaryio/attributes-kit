function hasDescription(element) {
  if (element.meta) {
    if (element.meta.description) {
      return true;
    }
  }

  return false;
}
