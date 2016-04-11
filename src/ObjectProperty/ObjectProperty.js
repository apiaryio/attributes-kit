import merge from 'lodash/merge';
import radium from 'radium';
import React from 'react';
import reactDom from 'react-dom';

import Column from '../Column/Column';
import Description from '../Description/Description';
import Key from '../Key/Key';
import ObjectPropertyDefaults from '../ObjectPropertyDefaults/ObjectPropertyDefaults';
import ObjectPropertySamples from '../ObjectPropertySamples/ObjectPropertySamples';
import ParentInfoLink from '../ParentInfo/ParentInfoLink';
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
  isIncluded,
  isInherited,
} from '../elements/element';

class ObjectProperty extends React.Component {
  static propTypes = {
    element: React.PropTypes.object,
    index: React.PropTypes.number,
    parentElement: React.PropTypes.object,
    reportKeyWidth: React.PropTypes.func,
    style: React.PropTypes.object,
    keyWidth: React.PropTypes.number,
  };

  static contextTypes = {
    theme: React.PropTypes.object,
    eventEmitter: React.PropTypes.object,
    showMemberParentLinks: React.PropTypes.bool,
    onElementLinkClick: React.PropTypes.func,
    includedProperties: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.string,
    ]),
    inheritedProperties: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.string,
    ]),
  };

  componentDidMount = () => {
    // After the component has been mounted, we can align the keys (the component
    // is in the DOM, it's possible to get the `clientWidth`).
    this.alignKey();

    // Everytime the `alignKeys` event is emitted, we'll re-align the keys.
    this.subscription = this.context.eventEmitter.addListener('alignKey', this.alignKey);
  };

  componentWillUnmount = () => {
    this.subscription.remove();
  };

  get style() {
    const {
      BORDER_COLOR,
      ROW_PADDING_TOP,
      ROW_PADDING_BOTTOM,
    } = this.context.theme;

    const style = {
      root: {
        borderBottom: `1px solid ${BORDER_COLOR}`,
        paddingTop: ROW_PADDING_TOP,
        paddingBottom: ROW_PADDING_BOTTOM,
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
    }

    if (keyWidth) {
      style.keyColumn.width = keyWidth;
      style.keyColumn.minWidth = keyWidth;
      style.keyColumn.maxWidth = keyWidth;
    } else {
      style.keyColumn.width = 'auto';
      style.keyColumn.minWidth = null;
      style.keyColumn.maxWidth = null;
    }


    if (isLastArrayItem(this.props.parentElement, this.props.index)) {
      style.root.borderBottom = '0px';
    }

    return merge(style, this.props.style || {});
  }

  alignKey = () => {
    const keyIdentifier = this.props.element.meta.id;
    const keyDomNode = reactDom.findDOMNode(this.refs.key);

    this.props.reportKeyWidth(keyIdentifier, keyDomNode.clientWidth);
  };

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
                <Column>
                  <Type
                    element={this.props.element}
                    style={this.style.type}
                  />
                </Column>

                {
                  (isIncluded(this.props.element) && this.context.includedProperties === 'tag') &&
                    <Column style={{ alignItems: 'flex-end' }}>
                      <ParentInfoLink
                        element={this.props.element}
                        show={this.context.showMemberParentLinks}
                        showBullet
                      />
                    </Column>
                }

                {
                  (isInherited(this.props.element) && this.context.inheritedProperties === 'tag') &&
                    <Column style={{ alignItems: 'flex-end' }}>
                      <ParentInfoLink
                        element={this.props.element}
                        show={this.context.showMemberParentLinks}
                        showBullet
                      />
                    </Column>
                }
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
