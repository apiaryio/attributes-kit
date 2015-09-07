import React from 'react';

import ValueComponent from 'Value/Value';

import './arrayItem.styl'

class ArrayItemComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ValueComponent data={this.props.data.content} />
    );
  }
}

export default ArrayItemComponent;
