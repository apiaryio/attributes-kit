import React from 'react';

import './value.styl'

class ValueComponent extends React.Component {
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

export default ValueComponent;
