import React from 'react';
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

    if (element === 'object') {
      return (
        <ObjectComponent data={this.props.data.content} />
      );
    } else if (element === 'array') {
      return (
        <ArrayComponent data={this.props.data.content} />
      )
    } else {
      return false;
    }
  }
}

export default AttributeComponent;
