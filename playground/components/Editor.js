import React from 'react';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';
import dedent from 'dedent';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import isEmpty from 'lodash/isEmpty';
import findIndex from 'lodash/findIndex';

import 'brace/theme/github';
import 'brace/mode/markdown';

import EditorActions from '../actions/editor';

class EditorComponent extends React.Component {

  static propTypes = {
    errors: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  };


  constructor() {
    super();

    this.state = {
      msonCode: dedent`

        # Data Structures

        ## Welcome Message

        - message: Hello everyone (string)

            Message for all the good folks at the
            [API Blueprint issue #191][1]

            [1]: https://github.com/apiaryio/api-blueprint/issues/191

        - author (Author)

        ## Author
        - name: Z
        - twitter: @zdne
        - address
            - company: \`Apiary, INC\`
            - street: 325 Ninth Street (required)
            - city: San Francisco
            - state: CA
            - zip (number, required)
            - tags (TagsArray)

        ## TagsArray (array)
        - red
        - green
        - blue
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


    if (isArray(this.props.errors)) {
      annotations = this.props.errors.map(this.generateAnnotation);
    } else if (isObject(this.props.errors)) {
      annotations.push(this.generateAnnotation(this.props.errors));
    }

    if (isEmpty(annotations)) {
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
      errorRow = findIndex(lines, (line) =>
        line.indexOf(errorLine) > -1
      );
    }

    return {
      type: 'error',
      text: `${this.props.errors.code} - ${this.props.errors.message}`,
      row: errorRow,
    };
  }

  handleChange = (msonCode) => {
    this.setState({ msonCode });
    EditorActions.parse(msonCode);
  };

  render() {
    return (
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
        editorProps={{ $blockScrolling: true }}
      />
    );
  }
}

export default EditorComponent;
