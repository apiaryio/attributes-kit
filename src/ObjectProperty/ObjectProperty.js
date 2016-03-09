import merge from 'lodash/merge';
import radium from 'radium';
import React from 'react';
import reactDom from 'react-dom';

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

  componentDidMount = () => {
    const keyIdentifier = this.props.element.meta.id;
    const keyDomNode = reactDom.findDOMNode(this.refs.key);

    this.props.reportKeyWidth(keyIdentifier, keyDomNode.clientWidth);
  }

  get style() {
    const { BORDER_COLOR } = this.context.theme;

    let style = {
      root: {
        borderBottom: `1px solid ${BORDER_COLOR}`,
        paddingTop: '8px',
        paddingBottom: '8px',
      },
      keyColumn: {
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
      style.keyColumn.paddingLeft = '20px';
    }

    let keyWidth;

    if (this.props.keyWidth) {
      if (style.keyColumn.paddingLeft) {
        keyWidth = `${this.props.keyWidth + 20}px`;
      } else {
        keyWidth = `${this.props.keyWidth}px`;
      }
    } else {
      keyWidth = 'auto';
    }

    style.keyColumn.width = keyWidth;
    style.keyColumn.minWidth = keyWidth;
    style.keyColumn.maxWidth = keyWidth;

    if (isLastArrayItem(this.props.parentElement, this.props.index)) {
      style.root.borderBottom = '0px';
    }

    return merge(style, this.props.style || {});
  }

  render() {
    return (
      <Row style={this.style.root}>
        <Column style={this.style.keyColumn}>
          <Key
            element={this.props.element}
            ref="key"
          />
        </Column>

        <Column style={this.style.requirementColumn}>
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

export default radium(ObjectProperty);
