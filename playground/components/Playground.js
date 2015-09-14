import React from 'react';

import EditorComponent from './Editor';
import JsonFormatterComponent from './JsonFormatter';
import {Attributes} from '../../src';
import actionTypes from '../actions/types';
import dispatcher from '../dispatcher';

class Playground extends React.Component {
  constructor(props) {
    super(props);

    this._onChange = this._onChange.bind(this);

    this.state = {
      attributes: null,
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
      this.setState({attributes: payload.attributes});
    }
  }

  render() {
    return (
      <div className="playgrund-app">
        <div className="column">
          <EditorComponent />
        </div>

        <div className="column">
          <JsonFormatterComponent data={this.state.attributes} />
        </div>

        <div className="column">
          <Attributes data={this.state.attributes} />
        </div>
      </div>
    );
  }
}

export default Playground;
