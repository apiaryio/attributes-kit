import React from 'react';

import ArrayItemDefaults from 'ArrayItemDefaults/ArrayItemDefaults';
import ArrayItemIndex from 'ArrayItemIndex/ArrayItemIndex';
import ArrayItemSamples from 'ArrayItemSamples/ArrayItemSamples';
import Column from 'Column/Column';
import Description from 'Description/Description';
import Row from 'Row/Row';

import {
  isLastArrayItem,
  isObject,
  isArray,
} from 'elements/element';

import {
  isExpandableCollapsible,
  containsExpandableCollapsibleElement,
  renderValue,
} from 'elements/expandableCollapsibleElement';

class StructuredArrayItem extends React.Component {
  static propTypes = {
    index: React.PropTypes.number,
    element: React.PropTypes.object,
    parentElement: React.PropTypes.object,
  }

  static contextTypes = {
    theme: React.PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.state = {
      'isExpandableCollapsible': isExpandableCollapsible(this.props.element),
      'isObject': isObject(this.props.element),
      'isArray': isArray(this.props.element),
    };

    // State hasn't been set; tree is expanded by default,
    // after a click, it collapses.
    if (this.state.isExpandableCollapsible) {
      this.state.isExpanded = true;
      this.state.containsExpandableCollapsibleElement = containsExpandableCollapsibleElement(this.props.parentElement.content);
    }
  }

  renderStyles() {
    const { BORDER_COLOR } = this.context.theme;

    const styles = {
      root: {
        borderBottom: `1px solid ${BORDER_COLOR}`,
        paddingTop: '8px',
        paddingBottom: '8px',
      },
      column: {
        width: '100%',
        paddingLeft: '8px',
        paddingRight: '8px',
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
    };

    const isLast = isLastArrayItem(this.props.parentElement, this.props.index);

    // Last array item doesn't have a border.
    if (isLast) {
      styles.root.borderBottom = 'none';
      styles.root.paddingBottom = '0px';
    } else {
      styles.root.paddingBottom = '0px';
    }

    return styles;
  }

  render() {
    const styles = this.renderStyles();

    return (
      <Row style={styles.root}>
        <ArrayItemIndex index={this.props.index} />

        <Column>
          <Row>
            <Description element={this.props.element} />
          </Row>
        </Column>

        <Column style={styles.column}>
          <Row>
            {
              renderValue(this.props.element, {
                expandableCollapsible: true,
                parentElement: this.props.parentElement,
              })
            }
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

export default StructuredArrayItem;
