import React from 'react';
import AceEditor from 'react-ace';
import dedent from 'dedent';
import lodash from 'lodash';

import 'brace/theme/github';
import 'brace/mode/text';

import EditorActions from '../actions/editor';

class EditorComponent extends React.Component {

  static propTypes = {
    errors: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]),
  }


  constructor() {
    super();

    this.state = {
      msonCode: dedent`

      # Data Structures

      ## Welcome Message
        - message: Hello everyone (string)

            Message for all the good folks at the
            [API Blueprint issue #191]
            (https://github.com/apiaryio/api-blueprint/issues/191)

        - author
            - name: Z
            - twitter: @zdne
            - address
                - company: \`Apiary, INC\`
                - street: 325 Ninth Street (required)
                - city: San Francisco
                - state: CA
                - zip (number, required)
                - tags: red, green, blue
      `,
    };
  }

  componentDidMount() {
    EditorActions.parse(this.state.msonCode);
  }

  onLoad = (aceEditor) => {
    this.aceEditor = aceEditor;

    let annotations = [];

    const session = this.aceEditor.getSession();
    if (lodash.isArray(this.props.errors)) {
      annotations = this.props.errors.map(this.generateAnnotation);
    } else if (lodash.isObject(this.props.errors)) {
      annotations.push(this.generateAnnotation(this.props.errors));
    }

    if (lodash.isEmpty(annotations)) {
      session.clearAnnotations();
    } else {
      session.setAnnotations(annotations);
    }
  };

  generateAnnotation(error) {
    const errorLine = this.state.msonCode
      .substring(error.location[0].index)
      .split('\n')[0];

    const lines = this.state.msonCode.split('\n');
    const errorRow = lodash(lines).findIndex((line) => {
      return (line.indexOf(errorLine) > -1);
    });

    return {
      type: 'error',
      text: `${this.props.errors.code} - ${this.props.errors.message}`,
      row: errorRow,
    };
  }

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
