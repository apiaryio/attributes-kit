import React from 'react';

import {
  isArray,
  isEnum,
  isMember,
  isObject,
  isSelect,
  isStructured,
} from '../Modules/ElementUtils/ElementUtils';

import { PrimitiveValue } from './PrimitiveValue/PrimitiveValue';
import Attribute from './Attribute/Attribute';

class Value extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    let value;

    if (isStructured(element.element)) {
      value = (
        <Attribute
          element={element}
          expandableCollapsible={props.expandableCollapsible}
          parentElement={props.parentElement}
        />
      );
    } else if (isMember(element.element)) {
      if (isStructured(element)) {
        value = (
          <Attribute
            element={element.content.value}
            expandableCollapsible={props.expandableCollapsible}
            parentElement={props.parentElement}
          />
        );
      } else if (element.content.value.content) {
        value = (
          <PrimitiveValue value={element.content.value.content} />
        );
      } else {
        value = false;
      }
    } else if (isObject(element) || isArray(element) || isSelect(element) || isEnum(element)) {
      value = (
        <Attribute
          element={element}
          expandableCollapsible={props.expandableCollapsible}
          parentElement={props.parentElement}
        />
      );
    } else if (element.content) {
      value = (
        <PrimitiveValue value={element.content} />
      );
    } else {
      value = false;
    }

    return value;
  };
}

export {
  Value,
};
