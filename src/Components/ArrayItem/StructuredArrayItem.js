import React from 'react';

import ArrayItemDefaults from '../ArrayItemDefaults/ArrayItemDefaults';
import ArrayItemIndex from '../ArrayItemIndex/ArrayItemIndex';
import ArrayItemSamples from '../ArrayItemSamples/ArrayItemSamples';
import Column from '../Column/Column';
import Description from '../Description/Description';
import Row from '../Row/Row';

import {
  hasDefaults,
  hasDescription,
  hasSamples,
  isArray,
  isLastArrayItem,
  isObject,
} from '../elements/element';

import {
  isExpandableCollapsible,
  containsExpandableCollapsibleElement,
  renderValue,
} from '../elements/expandableCollapsibleElement';

class StructuredArrayItem extends React.Component {
  static propTypes = {
    index: React.PropTypes.number,
    element: React.PropTypes.object,
    parentElement: React.PropTypes.object,
    showArrayItemIndex: React.PropTypes.bool,
    showBullet: React.PropTypes.bool,
  };

  static contextTypes = {
    theme: React.PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      isExpandableCollapsible: isExpandableCollapsible(this.props.element),
      isObject: isObject(this.props.element),
      isArray: isArray(this.props.element),
    };

    // State hasn't been set; tree is expanded by default,
    // after a click, it collapses.
    if (this.state.isExpandableCollapsible) {
      this.state.isExpanded = true;
      this.state.containsExpandableCollapsibleElement =
        containsExpandableCollapsibleElement(this.props.parentElement.content);
    }
  }

  renderStyles() {
    const { ARRAY_ITEMS_BORDER_COLOR } = this.context.theme;

    const styles = {
      root: {
        borderBottom: `1px solid ${ARRAY_ITEMS_BORDER_COLOR}`,
        paddingTop: '8px',
        paddingBottom: '8px',
      },
      column: {
        width: '100%',
      },
      type: {
        root: {
          marginBottom: '4px',
        },
      },
      toggleColumn: {
        width: '30px',
        maxWidth: '30px',
        minWidth: '30px',
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

    if (isObject(this.props.element)) {
      styles.root.paddingTop = '0px';
      styles.root.paddingBottom = '0px';
      styles.column.paddingLeft = '0px';
      styles.column.paddingRight = '0px';
    } else {
      styles.column.paddingLeft = '10px';
      styles.column.paddingRight = '10px';
    }

    const isLast = isLastArrayItem(this.props.parentElement, this.props.index);

    // Last array item doesn't have a border.
    if (isLast) {
      styles.root.borderBottom = 'none';
    }

    if (isObject(this.props.element)) {
      styles.root.paddingBottom = '0px';
    }

    return styles;
  }

  renderValue() {
    return (
      <Row>
        {
          renderValue(this.props.element, {
            expandableCollapsible: true,
            parentElement: this.props.parentElement,
          })
        }
      </Row>
    );
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
          {
            hasDescription(this.props.element) &&
              <Row>
                <Description element={this.props.element} />
              </Row>
          }

          {
            this.renderValue()
          }

          {
            hasSamples(this.props.element) &&
              <Row>
                <ArrayItemSamples element={this.props.element} />
              </Row>
          }

          {
            hasDefaults(this.props.element) &&
              <Row>
                <ArrayItemDefaults element={this.props.element} />
              </Row>
          }
        </Column>
      </Row>
    );
  }
}

export default StructuredArrayItem;
