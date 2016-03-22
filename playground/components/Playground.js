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
      title: true,
      collapseByDefault: true,
      maxInheritanceDepth: undefined,
      inheritanceTree: true,
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
      this.setState({ parseResult: payload });
    }
  };

  onElementLinkClick = (parentName, clickedElement, event) => {
    alert('Element ' + parentName + ' clicked!');
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

  toggleInheritanceTree = (eventObject) => {
    const value = eventObject.currentTarget.value;
    console.debug(`Setting the ‘inheritanceTree’ option to ‘${value}’...`);
    this.setState({
      inheritanceTree: value,
    });
  };

  toggleInheritanceDepth = (eventObject) => {
    const value = parseInt(eventObject.currentTarget.value, 10);
    console.debug(`Setting the ‘maxInheritanceDepth’ option to ‘${value}’...`);
    this.setState({
      maxInheritanceDepth: value,
    });
  };

  toggleCollapseByDefault = () => {
    this.setState({
      collapseByDefault: !this.state.collapseByDefault,
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
              <label htmlFor="inheritanceTreeSelect">
                Inheritance Tree
              </label>
              <br />
              <select
                id="inheritanceTreeSelect"
                onChange={this.toggleInheritanceTree}
              >
                <option value="show">Show</option>
                <option value="hide">Hide</option>
                <option value="compact">Compact</option>
              </select>
            </div>

            <div>
              <label htmlFor="inheritanceDepthInput">
                Inheritance Depth
              </label>
              <br />
              <input
                type="text"
                id="inheritanceDepthInput"
                onChange={this.toggleInheritanceDepth}
                placeholder="Infinity"
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
          </div>

          {
            dataStructures.length > 0 &&
              <AttributesKit.Attributes
                collapseByDefault={this.state.collapseByDefault}
                dataStructures={dataStructures}
                element={this.state.parseResult.dataStructures[0]}
                includedProperties={this.state.includedProperties}
                inheritanceTree={this.state.inheritanceTree}
                inheritedProperties={this.state.inheritedProperties}
                maxInheritanceDepth={this.state.maxInheritanceDepth}
                onElementLinkClick={this.onElementLinkClick}
                title={this.state.title}
              />
          }
        </div>
      </div>
    );
  };
}

export default Playground;
