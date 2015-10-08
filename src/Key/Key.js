import React from 'react';

import './key.styl';

class Key extends React.Component {
  static propTypes = {
    itemKey: React.PropTypes.number,
  }

  render() {
    return (
      <div className="attributeKey">
        {this.props.itemKey}
      </div>
    );
  }
}

export default Key;
