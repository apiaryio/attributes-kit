import React from 'react';

class SamplePrimitiveValue extends React.Component {
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
      <div className="attributeSamplePrimitiveValue">
        {this.renderValue()}
      </div>
    );
  }
}

export default SamplePrimitiveValue;
