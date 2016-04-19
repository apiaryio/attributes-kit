# Preprocessor

This module provides a way to preprocess a dereferenced tree of refract elements to add useful information into a cache that is later used to render React components on a web page. The purpose is to speed up rendering and simplify complex logic inside of components.

This library modifies the refract structure in-place.

## Usage

There are two ways to use this functionality: a convenience method and by instantiating the class manually.

```js
import {preprocess, Preprocessor} from 'Preprocessor/Preprocessor';

// Convenience layer, returns the in-place modified refract
preprocess(refract);

// Manually doing it, call `.value()` to get refract back
new Preprocessor(refract).process();
```

### Using the Cache

The preprocessor adds a new top-level property to each element, called `cache` and can be accessed like so:

```js
if (refract.cache.isArray) {
  console.log('I am an array!');
} else if (refract.cache.isStructured) {
  console.log('I am structured but not an array!');
}
```

## List of Cached Information

**TODO** This section contains a list of all values you will find under the element's `cache` key and what they mean.
