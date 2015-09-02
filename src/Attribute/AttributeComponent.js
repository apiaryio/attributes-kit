import React from 'react';
import RefractToComponentsMap from './elements/RefractToComponentMap';
import ArrayComponent from './elements/ArrayComponent';
import ObjectComponent from './elements/ObjectComponent';

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
