import React from 'react';

class KeyComponent extends React.Component {
  render() {
    const element = this.props.data.element;

    var key = false
    if (element === 'member') {
      key = this.props.data.content.key.content;
    } else {
      key = this.props.data.content;
    }

    if (!key) {
      return false;
    }

    return (
      <div className="keyContent">
        {key}
      </div>
    );
  }
}

export default KeyComponent;
