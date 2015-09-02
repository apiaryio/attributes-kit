import React from 'react';

import refractToComponentsMap from '../refractToComponentMap';

import './attribute.styl'

class AttributeComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.data) {
      return false;
    }

    var reactComponent = refractToComponentsMap[this.props.data.element];

    return React.createElement(reactComponent, {
      data: this.props.data.content
    });
  }
}

export default AttributeComponent;
