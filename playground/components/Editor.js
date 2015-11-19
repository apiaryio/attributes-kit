import React from 'react';
import AceEditor from 'react-ace';
import dedent from 'dedent';
import lodash from 'lodash';

import 'brace/theme/github';
import 'brace/mode/markdown';

import EditorActions from '../actions/editor';

class EditorComponent extends React.Component {

  static propTypes = {
    errors: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]),
  }


  constructor() {
    super();

    this.state = {
      clientSideParsing: false,
      msonCode: dedent`

      # Data Structures

      ## Welcome Message
        - message: Hello everyone (string)

          Message for all the good folks at the
          [API Blueprint issue #191](https://goo.gl/NZYvm1)

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
    EditorActions.parse(this.state.msonCode, this.state.clientSideParsing);
  }

  onLoad = (aceEditor) => {
    this.aceEditor = aceEditor;

    let annotations = [];

    const session = this.aceEditor.getSession();


    if (lodash.isArray(this.props.errors)) {
      annotations = this.props.errors.map(this.generateAnnotation);
    } else if (lodash.isObject(this.props.errors)) {
      annotations.push(this.generateAnnotation(this.props.errors));
    } else if (typeof(this.props.error) === 'string') {
      annotations.push({type: 'error', text: this.props.errors, row: 0});
    }


    if (lodash.isEmpty(annotations)) {
      session.clearAnnotations();
    } else {
      session.setAnnotations(annotations);
    }
  };

  generateAnnotation(error) {
    let errorRow = 0;

    if (error.location.length > 0) {
      const errorLine = this.state.msonCode
        .substring(error.location[0].index)
        .split('\n')[0];

      const lines = this.state.msonCode.split('\n');
      errorRow = lodash(lines).findIndex((line) => {
        return (line.indexOf(errorLine) > -1);
      });
    }

    return {
      type: 'error',
      text: `${this.props.errors.code} - ${this.props.errors.message}`,
      row: errorRow,
    };
  }

  handleSwitchParserType = () => {
    this.setState((state) => {
      return {clientSideParsing: !state.clientSideParsing};
    });
  }

  handleChange = (msonCode) => {
    this.setState({msonCode});
    EditorActions.parse(msonCode, this.state.clientSideParsing);
  };

  render() {
    return (
      <div>
        <AceEditor
          onLoad={this.onLoad}
          heigth="500px"
          width="100%"
          theme="github"
          mode="markdown"
          onChange={this.handleChange}
          name="msonEditor"
          value={this.state.msonCode}
          tabSize={2}
          editorProps={{$blockScrolling: true}}
        />

        <button onClick={this.handleSwitchParserType}>
          {'Switch to ' + (this.state.clientSideParsing ? 'drafter' : 'drafter.js')}
        </button>

      </div>
    );
  }
}

export default EditorComponent;
