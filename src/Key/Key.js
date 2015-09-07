import React from 'react';

import './key.styl'

class KeyComponent extends React.Component {
  render() {
    const element = this.props.data.element;

    let key = false;

    if (element === 'member') {
      key = this.props.data.content.key.content;
    } else {
      key = this.props.data.content;
    }

    if (!key) {
      return false;
    }

    return (
      <div className="attributeKey">
        {key}
      </div>
    );
  }
}

export default KeyComponent;
