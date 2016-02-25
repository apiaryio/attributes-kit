import React from 'react';

import Row from '../Row/Row';
import Column from '../Column/Column';

import Key from '../Key/Key';
import Requirement from '../Requirement/Requirement';
import Description from '../Description/Description';
import Toggle from '../Toggle/Toggle';
import Type from '../Type/Type';
import Ruler from '../Ruler/Ruler';
import ObjectPropertySamples from '../ObjectPropertySamples/ObjectPropertySamples';
import ObjectPropertyDefaults from '../ObjectPropertyDefaults/ObjectPropertyDefaults';

import {
  isExpandableCollapsible,
  containsExpandableCollapsibleElement,
  renderValue,
} from '../elements/expandableCollapsibleElement';

import {
  isObject,
  isArray,
  isLastArrayItem,
} from '../elements/element';

class StructuredObjectProperty extends React.Component {
  static propTypes = {
    element: React.PropTypes.object,
    parentElement: React.PropTypes.object,
    index: React.PropTypes.number,
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

  handleExpandCollapse = () => {
    this.setState({
      isExpanded: !this.state.isExpanded,
    });
  };

  renderStyles() {
    const { BORDER_COLOR } = this.context.theme;

    const styles = {
      root: {
        borderBottom: `1px solid ${BORDER_COLOR}`,
        paddingTop: '8px',
        paddingBottom: '8px',
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
      requirementColumn: {
        width: '25px',
        maxWidth: '25px',
        minWidth: '25px',
      },
      valueRow: {
        marginTop: '8px',
      },
      ruler: {
        root: {
          width: '100%',
          marginLeft: '6px',
          paddingBottom: '8px',
        },
      },
      description: {
        root: {
          marginTop: '4px',
        },
      },
    };

    const isLast = isLastArrayItem(this.props.parentElement, this.props.index);

    // Last array item doesn't have a border.
    if (isLast) {
      styles.ruler.root.paddingBottom = '0px';
      styles.root.borderBottom = 'none';
      styles.root.paddingBottom = '8px';
    } else {
      styles.root.paddingBottom = '8px';
    }

    if (!this.state.isExpanded) {
      styles.ruler.root.borderLeft = '1px solid #ffffff';
    }

    return styles;
  }

  renderValue(styles) {
    if (this.state.isExpanded) {
      return (
        <Row style={styles.valueRow}>
          {renderValue(this.props.element)}
        </Row>
      );
    }
  }

  render() {
    const styles = this.renderStyles();

    return (
      <Row style={styles.root}>
        <Column>
          <Row>
            <Column
              style={styles.toggleColumn}
            >
              <Toggle
                isExpanded={this.state.isExpanded}
                onClick={this.handleExpandCollapse}
              />
            </Column>

            <Column style={styles.keyColumn} >
              <Key
                onClick={this.handleExpandCollapse}
                element={this.props.element}
              />
            </Column>

            <Column style={styles.requirementColumn}>
              <Requirement element={this.props.element} />
            </Column>

            {
              this.props.element.element !== 'select' &&
                <Column>
                  <Type
                    element={this.props.element}
                  />
                </Column>
            }
          </Row>

          <Ruler style={styles.ruler}>
            <Row>
              <Description
                element={this.props.element}
                style={styles.description}
              />
            </Row>

            {this.renderValue(styles)}
          </Ruler>

          <Row>
            <ObjectPropertySamples element={this.props.element} />
            <ObjectPropertyDefaults element={this.props.element} />
          </Row>
        </Column>
      </Row>
    );
  }
}

export default StructuredObjectProperty;
