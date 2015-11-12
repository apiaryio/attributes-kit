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
        <header className="playground-header">
          <a href="/" className="logo">Attributes Kit Playground</a>
          <ul className="docs-links">
            <li><a href="https://github.com/apiaryio/attributes-kit" target="_blank" className="attributes-kit-repo">Attributes Kit Repository</a></li>
            <li><a href="https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md" target="_blank" className="mson-doc">MSON Specification</a></li>
          </ul>
        </header>
        <div className="playground-columns">
          <div className="column editor-column">
            <ul className="column-controls">
              <li><a href="">Copy</a></li>
            </ul>
            <EditorComponent />
          </div>

          <div className="column result-column">
            <ul className="column-controls">
              <li><a href="">Show Refract</a></li>
            </ul>
            <div className="tab">
              <JsonFormatterComponent element={this.state.attributes} />
            </div>
            <div className="tab active">
              <AttributesKit.Attributes element={this.state.attributes} />
            </div>
          </div>
          </div>
      </div>
    );
  }
}

export default Playground;
