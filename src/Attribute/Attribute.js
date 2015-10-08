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
      content: this.props.data.content,
      attributes: this.props.data.attributes,
    });
  }
}

export default Attribute;
