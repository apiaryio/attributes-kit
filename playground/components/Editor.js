import React from 'react';
import AceEditor from 'react-ace';

import 'brace/mode/json';
import 'brace/theme/github';

import EditorActions from '../actions/editor';

class EditorComponent extends React.Component {

  constructor() {
    super();

    this.state = {
      msonCode: '',
    }
  };

  onLoad = (aceEditor) => {
    this.aceEditor = aceEditor;
  };

  handleChange = (msonCode) => {
    this.setState({msonCode});
    EditorActions.parse(msonCode);
  };

  render() {
    return (
      <AceEditor
        onLoad={this.onLoad}
        mode="json"
        theme="github"
        onChange={this.handleChange}
        name="msonEditor"
        value={this.state.msonCode}
        editorProps={{$blockScrolling: true}}
      />
    );
  }
}

export default EditorComponent;
