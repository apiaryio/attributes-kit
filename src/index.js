import React from 'react';
import ReactDom from 'react-dom';
import {EventEmitter} from 'events';

import Attributes from 'Attributes/Attributes';
import Attribute from 'Attribute/Attribute';

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

  static Attributes = Attributes;
  static Attribute = Attribute;

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
      throw Error('Unable to find element where to render attributes.');
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
    ReactDom.render(<Attributes data={data} />, this.element);
  }
}

// Exports
export default AttributesKit;
