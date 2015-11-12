import React from 'react';

import AttributesKit from '../../src';
import EditorComponent from './Editor';
import JsonFormatterComponent from './JsonFormatter';
import actionTypes from '../actions/types';
import dispatcher from '../dispatcher';

class Playground extends React.Component {
  constructor(props) {
    super(props);

    this._onChange = this._onChange.bind(this);

    this.state = {
      parseResult: {
        errors: [],
      },
    };
  }

  componentDidMount() {
    dispatcher.register(this._onChange);
  }

  componentWillUnmount() {
    dispatcher.unregister(this._onChange);
  }

  _onChange(payload) {
    if (payload.type === actionTypes.MSON_PARSED) {
      this.setState({parseResult: payload});
    }
  }

  render() {
    return (
      <div className="playgrund-app">
        <div className="column">
          <EditorComponent errors={this.state.parseResult.errors} />
        </div>

        <div className="column">
          <JsonFormatterComponent
            element={this.state.parseResult.attributes} />
        </div>

        <div className="column">
          <AttributesKit.Attributes
            element={this.state.parseResult.attributes} />
        </div>
      </div>
    );
  }
}

export default Playground;
