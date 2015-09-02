import React from 'react';

class BaseCyclingComponent extends React.Component {
  constructor(props) {
    super(props);
    this.props.data = this.props.data || [];
  }
}

export default BaseCyclingComponent;
