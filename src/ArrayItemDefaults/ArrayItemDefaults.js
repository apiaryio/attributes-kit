import React from 'react';

import Defaults from 'Defaults/Defaults';

import {
  isObject,
} from 'elements/element';


class ArrayItemDefaults extends React.Component {
  static propTypes = {
    element: React.PropTypes.object,
  }

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

    if (isObject(value.element)) {
      return false;
    }

    let defaults = null;

    if (value.attributes) {
      defaults = value.attributes.default;
    }

    if (!defaults) {
      return false;
    }

    return (
      <div style={this.renderStyles()}>
        <Defaults element={defaults} />
      </div>
    );
  }
}

export default ArrayItemDefaults;
