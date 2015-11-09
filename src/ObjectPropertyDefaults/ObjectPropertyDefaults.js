import React from 'react';

import Defaults from 'Defaults/Defaults'

import {
  isObject,
  isObjectOrArray,
} from 'elements/element';


class ObjectPropertySamples extends React.Component {
  static propTypes = {
    element: React.PropTypes.object,
  }

  renderStyles() {
    return {};
  }

  render() {
    console.log('element', this.props.element)
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

    if (isObjectOrArray(value.element)) {
      return false;
    }

    let defaults = null;

    if (value.attributes) {
      defaults = value.attributes.default;
    }

    if (!defaults) {
      return false;
    }

    console.log(defaults)

    return (
      <div style={this.renderStyles()}>
        ObjectPropertyDefaults
      </div>
    );
  }
}

export default ObjectPropertySamples;
