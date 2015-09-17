import React from 'react';

class SimplePrimitiveValue extends React.Component {
  static propTypes = {
    data: React.PropTypes.node,
  }

  renderValue() {
    if (typeof this.props.data === 'object') {
      return this.props.data.content;
    }

    return this.props.data;
  }

  render() {
    return (
      <div className="attributeSimplePrimitiveValue">
        {this.renderValue()}
      </div>
    );
  }
}

export default SimplePrimitiveValue;
