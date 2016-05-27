import React from 'react';
import isString from 'lodash/isString';

import {
  isArray,
  isEnum,
  isMember,
  isObject,
  isSelect,
  isStructured,
} from '../../Modules/ElementUtils/ElementUtils';

import { PrimitiveValue } from '../PrimitiveValue/PrimitiveValue';
import Attribute from '../Attribute/Attribute';

class Value extends React.Component {
  static propTypes = {
    element: React.PropTypes.object,
    parentElement: React.PropTypes.object,
    style: React.PropTypes.object,
    expandableCollapsible: React.PropTypes.bool,
  };

  render() {
    let value;

    if (!this.props.element) {
      return null;
    }

    if (isMember(this.props.element)) {
      if (isStructured(this.props.element)) {
        return (
          <Attribute
            element={this.props.element.content.value}
            expandableCollapsible={this.props.expandableCollapsible}
            parentElement={this.props.parentElement}
            style={this.props.style}
          />
        );
      }

      if (isString(this.props.element.content.value.content)) {
        return (
          <PrimitiveValue
            value={this.props.element.content.value.content}
            style={this.props.style}
          />
        );
      }

      return null;
    }

    if (isStructured(this.props.element)) {
      value = (
        <Attribute
          element={this.props.element}
          expandableCollapsible={this.props.expandableCollapsible}
          parentElement={this.props.parentElement}
          style={this.props.style}
        />
      );
    } else if (
      isObject(this.props.element) || isArray(this.props.element) ||
      isSelect(this.props.element) || isEnum(this.props.element)
    ) {
      value = (
        <Attribute
          element={this.props.element}
          expandableCollapsible={this.props.expandableCollapsible}
          parentElement={this.props.parentElement}
          style={this.props.style}
        />
      );
    } else if (this.props.element.content) {
      value = (
        <PrimitiveValue
          value={this.props.element.content}
          style={this.props.style}
        />
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
