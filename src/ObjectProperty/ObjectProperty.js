import React from 'react';

import Column from 'Column/Column';
import Description from 'Description/Description';
import Key from 'Key/Key';
import ObjectPropertyDefaults from 'ObjectPropertyDefaults/ObjectPropertyDefaults';
import ObjectPropertySamples from 'ObjectPropertySamples/ObjectPropertySamples';
import Requirement from 'Requirement/Requirement';
import Row from 'Row/Row';
import Type from 'Type/Type';
import Value from 'Value/Value';

import {
  containsExpandableCollapsibleElement
} from 'elements/expandableCollapsibleElement';

import {
  isLastArrayItem,
} from 'elements/element';

class ObjectProperty extends React.Component {
  static propTypes = {
    element: React.PropTypes.object,
    parentElement: React.PropTypes.object,
  }

  constructor(props) {
    super(props);
  }

  renderStyles() {
    let styles = {
      root: {
        borderBottom: '1px solid #E8EBEE',
        paddingTop: '8px',
        paddingBottom: '8px',
      },
      keyColumn: {
        width: 'auto',
        maxWidth: '120px',
      },
      requirementColumn: {
        width: '25px',
        maxWidth: '25px',
        minWidth: '25px',
      },
      type: {
        root: {
          marginBottom: '4px',
        }
      }
    };

    if (containsExpandableCollapsibleElement(this.props.parentElement.content)) {
      styles.keyColumn.paddingLeft = '20px';
    }

    if (isLastArrayItem(this.props.parentElement, this.props.index)) {
      styles.root.borderBottom = '0px';
    }

    return styles;
  }

  render() {
    let styles = this.renderStyles();

    return (
      <Row style={styles.root}>
        <Column style={styles.keyColumn}>
          <Key data={this.props.element} />
        </Column>

        <Column style={styles.requirementColumn}>
          <Requirement data={this.props.element} />
        </Column>

        <Column>
          <Row>
            <Type
              element={this.props.element}
              style={styles.type}
            />
          </Row>

          <Row>
            <Description element={this.props.element} />
          </Row>

          <Row>
            <Value element={this.props.element} />
          </Row>

          <Row>
            <ObjectPropertySamples element={this.props.element} />
          </Row>

          <Row>
            <ObjectPropertyDefaults element={this.props.element} />
          </Row>
        </Column>
      </Row>
    );
  }
}

export default ObjectProperty;
