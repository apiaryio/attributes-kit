import React from 'react';

import './value.styl';


class Value extends React.Component {
  static propTypes = {
    value: React.PropTypes.string,
  }

  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.value) {
      return false;
    }

    return (
      <div className="attributeValue">
        {this.props.value}
      </div>
    );
  }
}

export default Value;
