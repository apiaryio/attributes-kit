import React from 'react';

import EditorActions from '../actions/editor';

class EditorComponent extends React.Component {

  render() {
    return (
      <textarea onChange={this._handleChange} />
    );
  }

  _handleChange(event) {
    this.setState({value: event.target.value});
    EditorActions.parse(event.target.value);
  }
}

export default EditorComponent;
