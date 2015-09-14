import React from 'react';

import './key.styl';

class Key extends React.Component {
  getKey() {
    if (typeof this.props.index !== 'undefined') {
      return this.props.index;
    }

    if (this.props.data.element === 'member') {
      return this.props.data.content.key.content;
    }

    return undefined;
  }

  render() {
    const key = this.getKey();

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

Key.propTypes = {
  index: React.PropTypes.number,
  data: React.PropTypes.object,
};

export default Key;
