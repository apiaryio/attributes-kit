import React from 'react';
import ArrayComponent from './elements/ArrayComponent';
import ObjectComponent from './elements/ObjectComponent';

class AttributeComponent extends React.Component {
  constructor(props) {
    super(props);

    this.componentsMap = {
      'object': ObjectComponent,
      'array': ArrayComponent
    }
  }

  render() {
    if (!this.props.data) {
      return false;
    }

    const element = this.props.data.element;
    return React.createElement(this.componentsMap[element], {data: this.props.data.content});
  }
}

export default AttributeComponent;
