import React from 'react';

import EditorActions from '../actions/editor';

class EditorComponent extends React.Component {

  _handleChange = (event) => {
    this.setState({value: event.target.value});
    EditorActions.parse(event.target.value);
  }

  render() {
    return (
      <textarea ref="textarea" onChange={this._handleChange} />
    );
  }
}

export default EditorComponent;
