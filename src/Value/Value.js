import React from 'react';

import './value.styl';


class Value extends React.Component {
  static propTypes = {
    value: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
      React.PropTypes.bool,
    ]),
  }

  render() {
    debugger
    return (
      <div className="attributeValue">
        {this.props.value}
      </div>
    );
  }
}

export default Value;
