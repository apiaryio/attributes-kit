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
      dereference: false,
      parseResult: {
        dataStructures: [],
        errors: [],
      },
    };

    this.style = {
      renderOptions: {
        paddingBottom: '4px',
        marginBottom: '4px',
        borderBottom: '1px solid #ddd',
      },
    };

    this.dispatcherIds = [];
  };

  componentDidMount() {
    this.dispatcherIds.push(dispatcher.register(this._onChange));
  };

  componentWillUnmount() {
    this.dispatcherIds.forEach((id) => dispatcher.unregister(id));
  };

  _onChange(payload) {
    if (payload.type === actionTypes.MSON_PARSED) {
      this.setState({ parseResult: payload });
    }
  };

  handleDereferenceToggle = (event) => {
    this.setState({
      dereference: event.target.checked,
    });
  };

  render() {
    let dataStructures;

    if (this.state.dereference) {
      dataStructures = this.state.parseResult.dataStructures;
    }

    return (
      <div className="playgrund-app">
        <div className="column">
          <EditorComponent
            errors={this.state.parseResult.errors}
          />
        </div>

        <div className="column">
          <JsonFormatterComponent
            element={this.state.parseResult.dataStructures[0]}
            dataStructures={dataStructures}
          />
        </div>

        <div className="column">
          <div style={this.style.renderOptions}>
            <label>
              <input type="checkbox" onChange={this.handleDereferenceToggle}/> Dereference
            </label>
          </div>
          <AttributesKit.Attributes
            element={this.state.parseResult.dataStructures[0]}
            dataStructures={dataStructures}
          />
        </div>
      </div>
    );
  };
}

export default Playground;
