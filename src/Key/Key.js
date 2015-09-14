import React from 'react';

import './key.styl';

class KeyComponent extends React.Component {
  getKey() {
    if (typeof this.props.index !== 'undefined') {
      return this.props.index;
    } else if (this.props.data.element === 'member') {
      return this.props.data.content.key.content;
    } else {
      return undefined;
    }
  }

  render() {
    let key = this.getKey()

    if (typeof key === 'undefined') {
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
