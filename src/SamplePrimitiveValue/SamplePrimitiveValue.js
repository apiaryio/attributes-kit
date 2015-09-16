import React from 'react';

class SamplePrimitiveValue extends React.Component {
  static propTypes = {
    data: React.PropTypes.node,
  }

  render() {
    return (
      <div className="attributeSamplePrimitiveValue">
        {this.props.data.content || this.props.data}
      </div>
    );
  }
}

export default SamplePrimitiveValue;
