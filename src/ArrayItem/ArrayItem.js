import React from 'react';

import ObjectMemberComponent from 'ObjectMember/ObjectMember';

import './arrayItem.styl';

class ArrayItemComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ObjectMemberComponent data={this.props.data} />
    );
  }
}

export default ArrayItemComponent;
