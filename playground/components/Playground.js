import React from 'react';

import AttributesKit from '../../src';
import EditorComponent from './Editor';
import JsonFormatterComponent from './JsonFormatter';
import actionTypes from '../actions/types';
import dispatcher from '../dispatcher';

class Playground extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      parseResult: {
        dataStructures: [],
        errors: [],
      },
    };

    this.dispatcherIds = [];
  };

  componentDidMount() {
    this.dispatcherIds.push(dispatcher.register(this.onChange));
  };

  componentWillUnmount() {
    this.dispatcherIds.forEach((id) => dispatcher.unregister(id));
  };

  onChange = (payload) => {
    if (payload.type === actionTypes.MSON_PARSED) {
      this.setState({ parseResult: payload });
    }
  };

  render() {
    const dataStructures = this.state.parseResult.dataStructures || [];

    return (
      <div className="playgrund-app">
        <div className="column">
          <EditorComponent
            errors={this.state.parseResult.errors}
          />
        </div>

        <div className="column">
          {
            dataStructures.length > 0 &&
              <JsonFormatterComponent
                element={this.state.parseResult.dataStructures[0]}
                dataStructures={dataStructures}
              />
          }
        </div>

        <div className="column">
          {
            dataStructures.length > 0 &&
              <AttributesKit.Attributes
                element={this.state.parseResult.dataStructures[0]}
                dataStructures={dataStructures}
              />
          }
        </div>
      </div>
    );
  };
}

export default Playground;
