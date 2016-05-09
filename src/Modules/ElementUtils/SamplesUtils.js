function hasSamples(element) {
  if (!element) {
    return false;
  }

  if (!element.attributes) {
    return false;
  }

  return !isEmpty(element.attributes.samples);
}
