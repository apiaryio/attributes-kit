import React from 'react';

class Type extends React.Component {
  static propTypes = {
    type: React.PropTypes.string,
  }

  render() {
    return (
      <div className="attributeType">
        {this.props.type}
      </div>
    );
  }
}

export default Type;
