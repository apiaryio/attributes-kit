import React from 'react';
import ReactDom from 'react-dom';
import {EventEmitter} from 'events';

import AttributesComponent from 'Attributes/Attributes';
import AttributeComponent from 'Attribute/Attribute';

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
    ReactDom.render(<AttributesComponent data={data} />, this.element);
  }
}

AttributesKit.Attributes = AttributesComponent;
AttributesKit.Attribute = AttributeComponent;

// Exports
export default AttributesKit;
