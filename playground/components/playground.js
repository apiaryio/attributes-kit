import React from 'react';

import EditorComponent from './editor';
import RefractPreviewComponent from './refractPreview';
import {AttributesComponent} from '../../src';
import actionTypes from '../actions/types';
import dispatcher from '../dispatcher';

class PlaygroundApp extends React.Component {
  constructor(props) {
    super(props);

    this._onChange = this._onChange.bind(this)

    this.state = {
      attributes: null
    };
  }

  render() {
    return (
      <div className="playgrund-app">
        <div className="column">
          <EditorComponent />
        </div>

        <div className="column">
          <RefractPreviewComponent />
        </div>

        <div className="column">
          <AttributesComponent data={this.state.attributes} />
        </div>
      </div>
    )
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
}

export default PlaygroundApp;
