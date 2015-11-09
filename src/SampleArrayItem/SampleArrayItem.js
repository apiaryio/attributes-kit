import React from 'react';

import Type from 'Type/Type';
import Value from 'Value/Value';
import Row from 'Row/Row';
import Column from 'Column/Column';
import Sample from 'Sample/Sample';

import {
  isObjectOrArray,
} from 'elements/element';

class SampleArrayItem extends React.Component {
  static propTypes = {
    index: React.PropTypes.number,
    samples: React.PropTypes.array,
    sample: React.PropTypes.object,
    element: React.PropTypes.object,
    parentElement: React.PropTypes.object,
  }

  static contextTypes = {
    theme: React.PropTypes.object,
  }

  renderStyles() {
    const {BORDER_COLOR} = this.context.theme;

    const styles = {
      root: {
        borderBottom: `1px solid ${BORDER_COLOR}`,
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
              expandableCollapsible="true"
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
