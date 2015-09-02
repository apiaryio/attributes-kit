import React from 'react';

import RefractToComponentsMap from '../refractToComponentMap';

class AttributeComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.data) {
      return false;
    }

    const element = this.props.data.element;
    return React.createElement(RefractToComponentsMap[element], {data: this.props.data.content});
  }
}

export default AttributeComponent;
