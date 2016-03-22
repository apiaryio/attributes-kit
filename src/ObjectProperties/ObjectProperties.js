import sift from 'sift';
import each from 'lodash/each';
import isEmpty from 'lodash/isEmpty';
import last from 'lodash/last';
import map from 'lodash/map';
import max from 'lodash/max';
import React from 'react';
import values from 'lodash/values';

import Select from '../Select/Select';
import ObjectProperty from '../ObjectProperty/ObjectProperty';
import ObjectPropertiesGroup from '../ObjectPropertiesGroup/ObjectPropertiesGroup';
import StructuredObjectProperty from '../ObjectProperty/StructuredObjectProperty';

import {
  isStructured,
} from '../elements/expandableCollapsibleElement';

import {
  isSelect,
  isInherited,
  isIncluded,
} from '../elements/element';

class ObjectProperties extends React.Component {
  static propTypes = {
    element: React.PropTypes.object,
    collapseByDefault: React.PropTypes.bool,
  };

  static contextTypes = {
    theme: React.PropTypes.object,
    includedProperties: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.string,
    ]),
    inheritedProperties: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.string,
    ]),
  };

  constructor(props) {
    super(props);

    this.state = {
      keyWidth: null,
    };

    this.keyWidthsIndex = {};
  }

  getComponent(element, { key, index }) {
    if (!key) {
      key = index;
    }

    if (isSelect(element)) {
      return (
        <Select
          key={key}
          index={index}
          element={element}
          parentElement={this.props.element}
        />
      );
    } else if (isStructured(element)) {
      return (
        <StructuredObjectProperty
          key={key}
          index={index}
          element={element}
          parentElement={this.props.element}
          collapseByDefault={this.props.collapseByDefault}
          reportKeyWidth={this.reportKeyWidth}
          keyWidth={this.state.keyWidth}
        />
      );
    }

    return (
      <ObjectProperty
        key={key}
        index={index}
        element={element}
        parentElement={this.props.element}
        collapseByDefault={this.props.collapseByDefault}
        reportKeyWidth={this.reportKeyWidth}
        keyWidth={this.state.keyWidth}
      />
    );
  }

  get style() {
    const style = {
      root: {
        width: '100%',
        height: 'auto',
      },
      separator: {
        width: '100%',
        height: '1px',
        backgroundColor: 'rgb(232, 235, 238)',
      },
    };

    return style;
  }

  reportKeyWidth = (keyIdentifier, keyWidth) => {
    this.keyWidthsIndex[keyIdentifier] = keyWidth;

    const keyWidths = values(this.keyWidthsIndex);

    if (keyWidths.length === this.props.element.content.length) {
      this.setState({
        keyWidth: max(keyWidths),
      });
    }
  }

  groupElements() {
    const elements = this.props.element.content;

    // Element groups, each group is represented by an object with
    // the following properties.
    //
    // * type (enum, required)
    //   * inherited (string) - Group of inherited properites
    //   * included (string) - Group of properties which were included
    //   * own (string) - Groupo of own properties
    //
    // * components (array, required)
    // * element (object, required)
    const groups = [];

    each(elements, (element, index) => {
      // Element hasn't been inherited, nor included.
      if (!element.meta || !element.meta.ref) {
        // The last group is a group of own properties, append the the current
        // element to that group.
        if (groups.length && last(groups).type === 'own') {
          return last(groups).components.push(
            this.getComponent(element, { index })
          );
        }

        // Last group is a group of inherited/included properties, create
        // a new group of own properties.
        return groups.push({
          type: 'own',
          components: [
            this.getComponent(element, { index }),
          ],
        });
      }

      let group;

      // Element has been inherited, or included; let's create a new group.
      if (groups.length && last(groups).name === element.meta.ref) {
        group = last(groups);
      } else {
        group = {
          name: element.meta.ref,
          components: [],
        };

        if (isInherited(element)) {
          group.type = 'inherited';
        } else if (isIncluded(element)) {
          group.type = 'included';
        }

        groups.push(group);
      }

      return group.components.push(
        this.getComponent(element, {
          key: `${group.name}+${index}`,
          index,
        })
      );
    });

    return groups;
  }

  render() {
    if (!this.props.element) {
      return false;
    }

    if (isEmpty(this.props.element.content)) {
      return false;
    }

    const elementGroups = this.groupElements();

    const ownPropertiesQuery = {
      type: 'own',
    };

    const includedPropertiesQuery = {
      type: 'included',
    };

    const inheritedPropertiesQuery = {
      type: 'inherited',
    };

    const ownOrIncludedGroupsQuery = {
      $or: [
        ownPropertiesQuery,
        includedPropertiesQuery,
      ],
    };

    const ownProperties = sift(ownPropertiesQuery, elementGroups);
    const inheritedProperties = sift(inheritedPropertiesQuery, elementGroups);
    const includedProperties = sift(includedPropertiesQuery, elementGroups);

    const ownOrIncludedProperties = sift(ownOrIncludedGroupsQuery, elementGroups);

    if (this.context.inheritedProperties === 'placeholder' &&
      this.context.includedProperties === 'placeholder') {
      return (
        <div style={this.style.root}>
          {
            map(inheritedProperties, (group, groupIndex) => (
              <ObjectPropertiesGroup type={group.type} name={group.name} key={groupIndex}>
                {
                  group.components
                }
              </ObjectPropertiesGroup>
            ))
          }

          {
            map(includedProperties, (group, groupIndex) => (
              <ObjectPropertiesGroup type={group.type} name={group.name} key={groupIndex}>
                {
                  group.components
                }
              </ObjectPropertiesGroup>
            ))
          }

          <div style={this.style.separator} />

          {
            map(ownProperties, (group, groupIndex) => (
              <ObjectPropertiesGroup type={group.type} name={group.name} key={groupIndex}>
                {
                  group.components
                }
              </ObjectPropertiesGroup>
            ))
          }
        </div>
      );
    }

    return (
      <div style={this.style.root}>
        {
          map(ownOrIncludedProperties, (group, groupIndex) => (
            <ObjectPropertiesGroup type={group.type} name={group.name} key={groupIndex}>
              {
                group.components
              }
            </ObjectPropertiesGroup>
          ))
        }

        {
          map(inheritedProperties, (group, groupIndex) => (
            <ObjectPropertiesGroup type={group.type} name={group.name} key={groupIndex}>
              {
                group.components
              }
            </ObjectPropertiesGroup>
          ))
        }
      </div>
    );
  }
}

export default ObjectProperties;
