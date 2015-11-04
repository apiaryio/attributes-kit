import React from 'react';

import EditorActions from '../actions/editor';

import TabOverride from './TabOverride';

class EditorComponent extends React.Component {

  componentDidMount() {
    TabOverride.tabSize(4);
    TabOverride.autoIndent(true);
    TabOverride.set(this.refs.textarea);
  }

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
