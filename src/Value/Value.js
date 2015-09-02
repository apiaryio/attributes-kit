import React from 'react';

import AttributeComponent from '../Attribute/Attribute';

import './value.styl'

class ValueComponent extends React.Component {
  constructor(props) {
    super(props);

    this.setValue(props.data.element)
  }

  setValue(element) {
    this.value = false;

    if (['object', 'array'].indexOf(element) > -1) {
      this.value = <AttributeComponent data={this.props.data.content} />;
    } else if (element === 'member') {
      if (['array', 'object'].indexOf(this.props.data.content.value.element) > -1) {
        this.value = <AttributeComponent data={this.props.data.content.value} />;
      } else {
        this.value = this.props.data.content.value.content;
      }
    } else {
      this.value = this.props.data.content;
    }
  }

  render() {
    if (!this.value) {
      return false;
    }

    return (
      <div className="attributeValue">
        {this.value}
      </div>
    );
  }
}

export default ValueComponent;
