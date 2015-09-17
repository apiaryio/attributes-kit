import React from 'react';

import SimpleValue from 'SimpleValue/SimpleValue';

class SimpleMemberValue extends React.Component {

  static propTypes = {
    data: React.PropTypes.node,
  };

  renderValue() {
    const value = this.props.data.content.value;
    if (typeof value === 'object') {
      return (
        <SimpleValue data={value} />
      );
    }

    return value;
  }

  render() {
    const content = this.props.data.content;
    return (
      <div>
        <div className="key">
          {content.key.content}
        </div>
        <div className="value">
          {this.renderValue()}
        </div>
      </div>
    );
  }
}

export default SimpleMemberValue;
