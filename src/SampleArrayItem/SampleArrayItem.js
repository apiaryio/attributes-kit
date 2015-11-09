import React from 'react';

import Type from 'Type/Type'
import Value from 'Value/Value'
import Row from 'Row/Row';
import Column from 'Column/Column';
import Sample from 'Sample/Sample';

import {
  isObjectOrArray,
  isLastArrayItem,
} from 'elements/element';

import {
  containsExpandableCollapsibleElement,
  containsObject,
  containsArray,
} from 'elements/expandableCollapsibleElement'


class SampleArrayItem extends React.Component {
  static propTypes = {

  }

  renderStyles() {
    let styles = {
      root: {
        borderBottom: '1px solid #E8EBEE',
        paddingTop: '8px',
        paddingBottom: '8px',
      },
      column: {
        paddingLeft: '8px',
        paddingRight: '8px',
      },
    };

    // Last array item doesn't have a border.
    const isLast = (this.props.samples.length - 1) === this.props.index;

    if (isLast) {
      styles.root.borderBottom = 'none';
    }

    if (isObjectOrArray(this.props.sample || this.props.element)) {
      styles.root.paddingBottom = '0px';
    }

    /*if (containsExpandableCollapsibleElement(this.props.samples)) {
      styles.column.paddingLeft = '28px';
    }*/

    /*if (containsObject(this.props.samples)) {
      styles.column.paddingLeft = '28px';
    }

    if (isObjectOrArray(this.props.sample)) {
      styles.column.paddingLeft = '8px';
    }*/

    return styles;
  }

  render() {
    const styles = this.renderStyles();

    if (isObjectOrArray(this.props.sample)) {
      return (
        <Row style={styles.root}>
          <Column style={styles.column}>
            <Sample
              parentElement={this.props.parentElement}
              element={this.props.sample}
              expandableCollapsible={true}
              // Temp
              showRuler={this.props.parentElement.element === 'array'}
            />
          </Column>
        </Row>
      );
    }

    return (
      <Row style={styles.root}>
        <Column style={styles.column}>
          <Row>
            <Type type={this.props.sample.element} />
          </Row>

          <Row>
            <Value value={this.props.sample.content} />
          </Row>
        </Column>
      </Row>
    );
  }
}

export default SampleArrayItem;
