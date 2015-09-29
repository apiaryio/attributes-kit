import React from 'react';
import {EventEmitter} from 'events';

import {Attributes} from 'index';

class AttributesKit extends EventEmitter {
  constructor(options) {
    super();

    this.options = options || {};

    this.element = options.element;
    this.elementSelector = options.elementSelector;
    this.options = options.options;

    this.getElement();
    this.validate();
  }

  validate() {
    if (!this.element) {
      console.error('Unable to find element where to render attributes.');
    }
  }

  getElement() {
    if (this.element) {
      return this.element;
    }

    this.element = document.querySelector(this.elementSelector);
    return this.element;
  }

  render(data) {
    React.render(<Attributes data={data} />, this.element);
  }
}

// Exports
export default AttributesKit;
