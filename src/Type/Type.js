import React from 'react';

import './type.styl';


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
