import isUndefined from 'lodash/isUndefined';

import React from 'react';
import PropTypes from 'prop-types';

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
    element: PropTypes.object,
    parentElement: PropTypes.object,
    style: PropTypes.object,
    expandableCollapsible: PropTypes.bool,
    isSample: PropTypes.bool,
    collapseByDefault: PropTypes.bool,
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
            isSample={this.props.isSample}
            collapseByDefault={this.props.collapseByDefault}
          />
        );
      }

      return (
        <PrimitiveValue
          value={this.props.element.content.value.content}
          style={this.props.style}
          collapseByDefault={this.props.collapseByDefault}
        />
      );
    }

    if (isStructured(this.props.element)) {
      value = (
        <Attribute
          element={this.props.element}
          expandableCollapsible={this.props.expandableCollapsible}
          parentElement={this.props.parentElement}
          style={this.props.style}
          isSample={this.props.isSample}
          collapseByDefault={this.props.collapseByDefault}
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
          isSample={this.props.isSample}
          collapseByDefault={this.props.collapseByDefault}
        />
      );
    } else if (!isUndefined(this.props.element.content)) {
      value = (
        <PrimitiveValue
          value={this.props.element.content}
          style={this.props.style}
          collapseByDefault={this.props.collapseByDefault}
        />
      );
    } else {
      value = null;
    }

    return value;
  };
}

export {
  Value,
};
