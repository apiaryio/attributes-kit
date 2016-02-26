import React from 'react';

import {
  isObject,
  isArray,
  isEnum,
} from '../elements/element';


class ObjectPropertySamples extends React.Component {
  static propTypes = {
    element: React.PropTypes.object,
  };

  renderStyles() {
    return {};
  }

  render() {
    if (!this.props.element) {
      return false;
    }

    if (!this.props.element.content) {
      return false;
    }

    const value = this.props.element.content.value;

    if (!value) {
      return false;
    }

    if (isObject(value.element) || isArray(value.element) || isEnum(value.element)) {
      return false;
    }

    return (
      <div style={this.renderStyles()}></div>
    );
  }
}

export default ObjectPropertySamples;
