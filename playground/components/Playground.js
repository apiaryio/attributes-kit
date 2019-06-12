import React from 'react';
import { Namespace } from 'api-elements';

import AttributesKit from '../../src';
import EditorComponent from './Editor';
import JsonFormatterComponent from './JsonFormatter';
import actionTypes from '../actions/types';
import dispatcher from '../dispatcher';

class Playground extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: true,
      collapseByDefault: true,
      namedTypes: false,
      includedProperties: 'show',
      inheritedProperties: 'show',
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
      const minimNamespace = new Namespace();
      payload = {
        errors: payload.errors,
        dataStructures: minimNamespace.fromRefract(payload.dataStructures),
      };
      this.setState({ parseResult: payload });
    }
  };

  onElementLinkClick = (parentName) => {
    alert(`Element ‘${parentName}’ clicked!`);
  };

  toggleTitle = (eventObject) => {
    const value = eventObject.currentTarget.value;
    console.debug(`Setting the ‘title’ option to ‘${value}’...`);
    this.setState({
      title: value,
    });
  };

  toggleInheritedProperties = (eventObject) => {
    const value = eventObject.currentTarget.value;
    console.debug(`Setting the ‘inheritedProperties’ option to ‘${value}’...`);
    this.setState({
      inheritedProperties: value,
    });
  };

  toggleIncludedProperties = (eventObject) => {
    const value = eventObject.currentTarget.value;
    console.debug(`Setting the ‘includedProperties’ option to ‘${value}’...`);
    this.setState({
      includedProperties: value,
    });
  };

  toggleIncludedProperties = (eventObject) => {
    const value = eventObject.currentTarget.value;
    console.debug(`Setting the ‘includedProperties’ option to ‘${value}’...`);
    this.setState({
      includedProperties: value,
    });
  };

  toggleCollapseByDefault = () => {
    console.debug(`
      Setting the ‘collapseByDefault’ option to ‘${!this.state.collapseByDefault}’...
    `);

    this.setState({
      collapseByDefault: !this.state.collapseByDefault,
    });
  };

  toggleNamedTypes = () => {
    console.debug(`Setting the ‘namedTypes’ option to ‘${!this.state.namedTypes}’...`);

    this.setState({
      namedTypes: !this.state.namedTypes,
    });
  };

  alignKeys = () => {
    console.debug('Triggering alignment of keys...');

    this.refs.attributes.alignKeys();
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
                element={dataStructures.first}
                dataStructures={dataStructures}
              />
          }
        </div>

        <div className="column">
          <div className="options">
            <h3>Options</h3>
            <div>
              <label htmlFor="titleSelect">
                Title
              </label>
              <br />
              <select
                id="titleSelect"
                onChange={this.toggleTitle}
              >
                <option value="show">Show</option>
                <option value="hide">Hide</option>
              </select>
            </div>

            <div>
              <label htmlFor="inheritedPropertiesSelect">
                Inherited Properties
              </label>
              <br />
              <select
                id="inheritedPropertiesSelect"
                onChange={this.toggleInheritedProperties}
              >
                <option value="show">Show</option>
                <option value="hide">Hide</option>
                <option value="group">Group</option>
                <option value="tag">Tag</option>
                <option value="placeholder">Placeholder</option>
              </select>
            </div>

            <div>
              <label htmlFor="includedPropertiesSelect">
                Included Properties
              </label>
              <br />
              <select
                id="includedPropertiesSelect"
                onChange={this.toggleIncludedProperties}
              >
                <option value="show">Show</option>
                <option value="hide">Hide</option>
                <option value="group">Group</option>
                <option value="tag">Tag</option>
                <option value="placeholder">Placeholder</option>
              </select>
            </div>

            <div>
              <label htmlFor="namedTypesCheckbox">
                Named Types
              </label>
              <br />
              <input
                type="checkbox"
                id="namedTypesCheckbox"
                onChange={this.toggleNamedTypes}
              />
            </div>

            <div>
              <label htmlFor="collapseByDefaultCheckbox">
                Collapse by default
              </label>
              <br />
              <input
                defaultChecked
                type="checkbox"
                id="collapseByDefaultCheckbox"
                onChange={this.toggleCollapseByDefault}
              />
            </div>

            <div>
              <label>
                Align keys
              </label>
              <br />
              <input
                type="button"
                onClick={this.alignKeys}
                value="Align keys"
              />
            </div>
          </div>

          {
            dataStructures.length > 0 &&
              <AttributesKit.Attributes
                ref="attributes"
                collapseByDefault={this.state.collapseByDefault}
                dataStructures={dataStructures}
                element={dataStructures.first}
                includedProperties={this.state.includedProperties}
                inheritedProperties={this.state.inheritedProperties}
                onElementLinkClick={this.onElementLinkClick}
                title={this.state.title}
                namedTypes={this.state.namedTypes}
              />
          }
        </div>
      </div>
    );
  };
}

export default Playground;
