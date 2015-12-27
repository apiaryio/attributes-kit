import React from 'react';

import Row from 'Row/Row';
import Column from 'Column/Column';
import Sample from 'Sample/Sample';
import Key from 'Key/Key';
import Type from 'Type/Type';
import Value from 'Value/Value';
import Toggle from 'Toggle/Toggle';
import Ruler from 'Ruler/Ruler';

import {
  isObjectOrArray,
  isLastArrayItem,
} from 'elements/element';

import {
  containsExpandableCollapsibleElement,
} from 'elements/expandableCollapsibleElement';

class SampleArray extends React.Component {
  static propTypes = {
    parentElement: React.PropTypes.object,
    element: React.PropTypes.object,
    index: React.PropTypes.number,
  }

  static contextTypes = {
    theme: React.PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.state = {
      isExpanded: true,
    };
  }

  handleExpandCollapse = () => {
    this.setState({
      isExpanded: !this.state.isExpanded,
    });
  }

  renderStyles() {
    const { BORDER_COLOR } = this.context.theme;

    const styles = {
      root: {
        paddingTop: '8px',
        paddingBottom: '8px',
        borderBottom: `1px solid ${BORDER_COLOR}`,
        paddingRight: '8px',
      },
      separator: {
        width: '100%',
        paddingLeft: '6px',
      },
      separatorLine: {
        width: '100%',
        height: '1px',
        backgroundColor: BORDER_COLOR,
      },
      toggleColumn: {
        width: '20px',
        maxWidth: '20px',
        minWidth: '20px',
      },
      keyColumn: {
        width: '100px',
        maxWidth: '100px',
        minWidth: '100px',
      },
      valueRow: {
        marginTop: '8px',
      },
      ruler: {
        root: {
          marginLeft: '6px',
          paddingBottom: '13px',
        },
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

    if (isObjectOrArray(this.props.element)) {
      styles.root.borderBottom = '0px';
      styles.root.paddingBottom = '0px';
      styles.keyColumn.paddingLeft = '0px';
    }

    // Temp
    if (!this.state.isExpanded) {
      styles.valueRow.display = 'none';
      styles.separator.display = 'none';
      styles.root.paddingBottom = '8px';
      // Only when other Samples/Defaults?
      styles.root.borderBottom = `1px solid ${BORDER_COLOR}`;
    }

    if (isLastArrayItem(this.props.parentElement, this.props.index)) {
      styles.root.borderBottom = '0px';
      // Temp
      styles.separator.display = 'none';
    }

    return styles;
  }

  render() {
    const styles = this.renderStyles();

    if (isObjectOrArray(this.props.element.content.value)) {
      return (
        <Row style={styles.root}>
          <Column>
            <Row>
              <Column style={styles.toggleColumn}>
                <Toggle
                  isExpanded={this.state.isExpanded}
                  onClick={this.handleExpandCollapse}
                />
              </Column>

              <Column style={styles.keyColumn}>
                <Key
                  onClick={this.handleExpandCollapse}
                  element={this.props.element}
                />
              </Column>
            </Row>

            <Row style={styles.valueRow}>
              <Ruler style={styles.ruler}>
                <Sample
                  parentElement={this.props.element}
                  element={this.props.element.content.value}
                />
              </Ruler>
            </Row>

            <div style={styles.separator}>
              <div style={styles.separatorLine} />
            </div>
          </Column>
        </Row>
      );
    }

    return (
      <Row style={styles.root}>
        <Column style={styles.keyColumn}>
          <Key element={this.props.element} />
        </Column>

        <Column>
          <Type
            element={this.props.element}
            style={styles.type}
          />

          <Value element={this.props.element} />
        </Column>
      </Row>
    );
  }
}

export default SampleArray;
