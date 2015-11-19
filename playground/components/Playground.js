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

    this.dispatcherIds = [];
  }

  componentDidMount() {
    this.dispatcherIds.push(dispatcher.register(this._onChange));
  }

  componentWillUnmount() {
    this.dispatcherIds.forEach((id) => dispatcher.unregister(id));
  }

  _onChange(payload) {
    if (payload.type === actionTypes.MSON_PARSED) {
      this.setState({parseResult: payload});
    }
  }

  render() {
    return (
      <div className="playground-app">
        <div className="header">
        <div className="leftSide"><span>Attributes Kit Playground</span></div>
        <div className="rightSide">
          <span>
            <a target="_blank" className="ico githubIco" href="https://github.com/apiaryio/attributes-kit">Attributes Kit Repository</a>
          </span>
          <span>
            <a target="_blank" className="ico documentationIco" href="https://github.com/apiaryio/mson">Mson Documentation</a>
          </span>
        </div>
        </div>
        <div className="body">
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
    </div>
    );
  }
}

export default Playground;
