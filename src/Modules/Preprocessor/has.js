import isEmpty from 'lodash/isEmpty';
import { setCache } from './utilities';

export function defaultValue(refract) {
  let hasDefault = false;

  if (refract && refract.attributes && refract.attributes.default !== undefined) {
    hasDefault = true;
  }

  setCache(refract, 'hasDefault', hasDefault);
}

export function samples(refract) {
  let hasSamples = false;

  if (refract && refract.attributes && !isEmpty(refract.attributes.samples)) {
    hasSamples = true;
  }

  setCache(refract, 'hasSamples', hasSamples);
}

export function description(refract) {
  let hasDescription = false;

  if (refract && refract.meta && refract.meta.description) {
    hasDescription = true;
  }

  setCache(refract, 'hasDescription', hasDescription);
}
