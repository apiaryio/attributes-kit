import React from 'react';
import AttributeComponent from '../Attribute/AttributeComponent';

class ValueComponent extends React.Component {
  render() {
    const element = this.props.data.element;


    const value = false;
    if (['object', 'array'].indexOf(element) > -1) {
      value = <AttributeComponent data={this.props.data.content} />;
    } else if (element === 'member') {
      if (['array', 'object'].indexOf(this.props.data.content.value.element) > -1) {
        value = <AttributeComponent data={this.props.data.content.value} />;
      } else {
        value = this.props.data.content.value.content;
      }
    } else {
      value = this.props.data.content;
    }

    if (!value) {
      return false;
    }

    return (
      <div className="valueContent">
        {value}
      </div>
    );
  }
}

export default ValueComponent;
