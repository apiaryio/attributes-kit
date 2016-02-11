import React from 'react';

import ArrayItemDefaults from 'ArrayItemDefaults/ArrayItemDefaults';
import ArrayItemIndex from 'ArrayItemIndex/ArrayItemIndex';
import ArrayItemSamples from 'ArrayItemSamples/ArrayItemSamples';
import Column from 'Column/Column';
import Description from 'Description/Description';
import Row from 'Row/Row';
import Type from 'Type/Type';
import Value from 'Value/Value';

import {
  isObjectOrArray,
  isLastArrayItem,
  isEnum,
} from 'elements/element';

import {
  containsExpandableCollapsibleElement,
} from 'elements/expandableCollapsibleElement';


class ArrayItem extends React.Component {
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
      column: {
        paddingLeft: '8px',
      },
      type: {
        root: {
          marginBottom: '4px',
        },
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
      styles.root.borderBottom = 'none';
    }

    // In case of objects and array we want to indent
    // all properties (members) the same.
    if (
      isObjectOrArray(this.props.parentElement.element) &&
      containsExpandableCollapsibleElement(this.props.parentElement.content)
    ) {
      styles.column.paddingLeft = '28px';
    }

    return styles;
  }

  render() {
    const styles = this.renderStyles();

    return (
      <Row style={styles.root}>
        {
          this.props.showArrayItemIndex &&
            <ArrayItemIndex index={this.props.index} />
        }

        {
          this.props.showBullet &&
            <Column style={styles.bulletColumn} />
        }

        <Column style={styles.column}>
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
            <ArrayItemSamples element={this.props.element} />
          </Row>

          <Row>
            <ArrayItemDefaults element={this.props.element} />
          </Row>
        </Column>
      </Row>
    );
  }
}

export default ArrayItem;
