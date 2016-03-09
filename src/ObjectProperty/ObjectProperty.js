import React from 'react';

import Column from '../Column/Column';
import Description from '../Description/Description';
import Key from '../Key/Key';
import ObjectPropertyDefaults from '../ObjectPropertyDefaults/ObjectPropertyDefaults';
import ObjectPropertySamples from '../ObjectPropertySamples/ObjectPropertySamples';
import Requirement from '../Requirement/Requirement';
import Row from '../Row/Row';
import Type from '../Type/Type';
import Value from '../Value/Value';

import {
  containsExpandableCollapsibleElement,
} from '../elements/expandableCollapsibleElement';

import {
  hasDefaults,
  hasDescription,
  hasSamples,
  hasType,
  hasValue,
  isLastArrayItem,
} from '../elements/element';

class ObjectProperty extends React.Component {
  static propTypes = {
    index: React.PropTypes.number,
    element: React.PropTypes.object,
    parentElement: React.PropTypes.object,
  };

  static contextTypes = {
    theme: React.PropTypes.object,
  };

  renderStyles() {
    const { BORDER_COLOR } = this.context.theme;

    const styles = {
      root: {
        borderBottom: `1px solid ${BORDER_COLOR}`,
        paddingTop: '8px',
        paddingBottom: '8px',
      },
      keyColumn: {
        width: '120px',
        maxWidth: '120px',
        minWidth: '120px',
      },
      requirementColumn: {
        width: '25px',
        maxWidth: '25px',
        minWidth: '25px',
      },
      type: {
        root: {
          marginBottom: '4px',
        },
      },
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
    const styles = this.renderStyles();

    return (
      <Row style={styles.root}>
        <Column style={styles.keyColumn}>
          <Key element={this.props.element} />
        </Column>

        <Column style={styles.requirementColumn}>
          <Requirement element={this.props.element} />
        </Column>

        <Column>
          {
            hasType(this.props.element) &&
              <Row>
                <Type
                  element={this.props.element}
                  style={styles.type}
                />
              </Row>
          }

          {
            hasDescription(this.props.element) &&
              <Row>
                <Description element={this.props.element} />
              </Row>
          }

          {
            hasValue(this.props.element) &&
              <Row>
                <Value element={this.props.element} />
              </Row>
          }

          {
            hasSamples(this.props.element) &&
              <Row>
                <ObjectPropertySamples element={this.props.element} />
              </Row>
          }

          {
            hasDefaults(this.props.element) &&
              <Row>
                <ObjectPropertyDefaults element={this.props.element} />
              </Row>
          }
        </Column>
      </Row>
    );
  }
}

export default ObjectProperty;
