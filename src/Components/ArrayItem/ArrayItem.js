import React from 'react';
import Radium from 'radium';
import merge from 'lodash/merge';

import ArrayItemDefaults from '../ArrayItemDefaults/ArrayItemDefaults';
import ArrayItemIndex from '../ArrayItemIndex/ArrayItemIndex';
import ArrayItemSamples from '../ArrayItemSamples/ArrayItemSamples';
import Column from '../Column/Column';
import Description from '../Description/Description';
import Row from '../Row/Row';
import Type from '../Type/Type';
import { Value } from '../Value/Value';

import {
  containsStructuredElement,
  hasDefault,
  hasDescription,
  hasSamples,
  hasType,
  hasValue,
  isLastArrayItem,
  isObjectOrArray,
} from '../../Modules/ElementUtils/ElementUtils';

@Radium
class ArrayItem extends React.Component {
  static propTypes = {
    element: React.PropTypes.object,
    index: React.PropTypes.number,
    parentElement: React.PropTypes.object,
    showArrayItemIndex: React.PropTypes.bool,
    showBullet: React.PropTypes.bool,
    style: React.PropTypes.object,
    collapseByDefault: React.PropTypes.bool,
  };

  static contextTypes = {
    theme: React.PropTypes.object,
  };

  get style() {
    const { ARRAY_ITEMS_BORDER_COLOR } = this.context.theme;

    const style = {
      root: {
        borderBottom: `1px solid ${ARRAY_ITEMS_BORDER_COLOR}`,
        paddingTop: '8px',
        paddingBottom: '8px',
      },
      column: {
        paddingLeft: '8px',
      },
      type: {
        type: {
          marginBottom: '0px',
        },
      },
      typeColumn: {
        justifyContent: 'center',
      },
      bulletColumn: {
        width: '8px',
        minWidth: '8px',
        maxWidth: '8px',
        height: 'auto',
        alignSelf: 'stretch',
        backgroundImage: `url(${require('./bullet.svg')})`,
        backgroundSize: '8px 8px',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        marginLeft: '16px',
        marginRight: '8px',
      },
    };

    // Last array item doesn't have a border.
    if (isLastArrayItem(this.props.parentElement, this.props.index)) {
      style.root.borderBottom = 'none';
    }

    // In case of objects and array we want to indent
    // all properties (members) the same.
    if (
      isObjectOrArray(this.props.parentElement) &&
      containsStructuredElement(this.props.parentElement)
    ) {
      style.column.paddingLeft = '10px';
    }

    return merge(style, this.props.style || {});
  }

  render() {
    const style = this.style;

    return (
      <Row style={style.root}>
        {
          this.props.showArrayItemIndex &&
            <ArrayItemIndex index={this.props.index} />
        }

        {
          this.props.showBullet &&
            <Column style={style.bulletColumn} />
        }

        <Column style={style.column}>
          <Row>
            {
              hasValue(this.props.element) &&
                <Column>
                  <Value
                    element={this.props.element}
                    collapseByDefault={this.props.collapseByDefault}
                  />
                </Column>
            }

            {
              hasType(this.props.element) &&
                <Column style={style.typeColumn}>
                  <Type
                    element={this.props.element}
                    style={style.type}
                  />
                </Column>
            }
          </Row>

          {
            hasDescription(this.props.element) &&
              <Row>
                <Description element={this.props.element} />
              </Row>
          }

          {
            hasSamples(this.props.element) &&
              <Row>
                <ArrayItemSamples
                  element={this.props.element}
                  collapseByDefault={this.props.collapseByDefault}
                />
              </Row>
          }

          {
            hasDefault(this.props.element) &&
              <Row>
                <ArrayItemDefaults
                  element={this.props.element}
                  collapseByDefault={this.props.collapseByDefault}
                />
              </Row>
          }
        </Column>
      </Row>
    );
  }
}

export default ArrayItem;
