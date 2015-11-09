import React from 'react';

import refractToComponentsMap from 'refractToComponentMap';

import './attribute.styl';

class Attribute extends React.Component {
  static propTypes = {
    data: React.PropTypes.object,
  }

  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.data) {
      return false;
    }

    const reactComponent = refractToComponentsMap[this.props.data.element];

    if (typeof reactComponent === 'undefined') {
      return new Error(`Unable to find a rendering component for ${this.props.data.element}`);
    }

    return React.createElement(reactComponent, {
      data: this.props.data,
      expandableCollapsible: this.props.expandableCollapsible,
      parentElement: this.props.parentElement,
    });
  }
}

export default Attribute;
