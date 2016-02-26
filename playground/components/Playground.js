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
      showIncluded: true,
      showInherited: true,
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

  toggleInheritedMembers = () => {
    this.setState({
      showInherited: !this.state.showInherited,
    });
  };

  toggleIncludedMembers = () => {
    this.setState({
      showIncluded: !this.state.showIncluded,
    });
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
          <h3>Options</h3>
          <div>
            <input
              type="checkbox"
              defaultChecked
              id="showInheritedMembersCheckbox"
              onChange={this.toggleInheritedMembers}
            />
            <label htmlFor="showInheritedMembersCheckbox">
              Show inherited members
            </label>
          </div>

          <div>
            <input
              type="checkbox"
              defaultChecked
              id="showIncludedMembersCheckbox"
              onChange={this.toggleIncludedMembers}
            />
            <label htmlFor="showIncludedMembersCheckbox">
              Show included members
            </label>
          </div>

          {
            dataStructures.length > 0 &&
              <AttributesKit.Attributes
                element={this.state.parseResult.dataStructures[0]}
                dataStructures={dataStructures}
                showInherited={this.state.showInherited}
                showIncluded={this.state.showIncluded}
              />
          }
        </div>
      </div>
    );
  };
}

export default Playground;
