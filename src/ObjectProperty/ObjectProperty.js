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
import { KeyColumn } from './KeyColumn';

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

  get style() {
    const {
      BORDER_COLOR,
      ROW_PADDING_TOP,
      ROW_PADDING_BOTTOM,
    } = this.context.theme;

    const style = {
      base: {
        borderBottom: `1px solid ${BORDER_COLOR}`,
        paddingTop: ROW_PADDING_TOP,
        paddingBottom: ROW_PADDING_BOTTOM,
      },
    };

    if (isLastArrayItem(this.props.parentElement, this.props.index)) {
      style.base.borderBottom = '0px';
    }

    return merge(style, this.props.style || {});
  }

  render() {
    return (
      <Row style={this.style.base}>
        <KeyColumn
          element={this.props.element}
          parentElement={this.props.parentElement}
          reportKeyWidth={this.props.reportKeyWidth}
          keyWidth={this.props.keyWidth}
        />

        <Column>
          {
            hasType(this.props.element) &&
              <Row>
                <Column>
                  <Type element={this.props.element} />
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
