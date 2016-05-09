function hasDefaults(element) {
  if (!element) {
    return false;
  }

  if (!element.attributes) {
    return false;
  }

  return !!element.attributes.default;
}
