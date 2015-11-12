import React from 'react';
import AceEditor from 'react-ace';
import lodash from 'lodash';
import dedent from 'dedent';

import 'brace/theme/github';
import 'brace/mode/text';

import EditorActions from '../actions/editor';

class EditorComponent extends React.Component {

  constructor() {
    super();

    this.state = {
      msonCode: dedent`
        # Data Structures

        ## User
        + name (required, string)
      `,
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
        heigth="500px"
        width="100%"
        theme="github"
        mode="text"
        onChange={this.handleChange}
        name="msonEditor"
        value={this.state.msonCode}
        editorProps={{$blockScrolling: true}}
      />
    );
  }
}

export default EditorComponent;
