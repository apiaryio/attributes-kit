import React from 'react';
import {EventEmitter} from 'events';

import {Attributes, Attribute} from 'index';

class AttributesKit extends EventEmitter {
  static render(data, element, options) {
    let elementSelector = null;
    if (typeof element === 'string') {
      elementSelector = element;
    }

    const attributesKit = new AttributesKit({
      element,
      elementSelector,
      options,
    });

    attributesKit.render(data);
    return attributesKit;
  }

  static components = {
    Attributes,
    Attribute,
  };

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
