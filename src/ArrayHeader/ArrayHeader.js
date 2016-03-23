import React from 'react';

import Type from '../Type/Type';
import SampleToggle from '../SampleToggle/SampleToggle';
import Row from '../Row/Row';
import Column from '../Column/Column';

import {
  hasSamples,
  isEnum,
  hasMembers,
} from '../elements/element';

class ArrayHeader extends React.Component {
  static propTypes = {
    isExpanded: React.PropTypes.bool,
    element: React.PropTypes.object,
    parentElement: React.PropTypes.object,
    onSampleToggleClick: React.PropTypes.func,
    sampleTitle: React.PropTypes.string,
  };

  static contextTypes = {
    theme: React.PropTypes.object,
  };

  renderStyles() {
    const {
      BORDER_COLOR,
      ARRAY_HEADER_BACKGROUND_COLOR,
    } = this.context.theme;

    const styles = {
      root: {
        border: `1px solid ${BORDER_COLOR}`,
        borderBottom: `1px solid ${BORDER_COLOR}`,
        height: 'auto',
        paddingBottom: '6px',
        paddingLeft: '8px',
        paddingTop: '4px',
        width: '100%',
        backgroundColor: ARRAY_HEADER_BACKGROUND_COLOR,
      },
      sampleToggle: {
        root: {
          marginTop: '4px',
        },
      },
      type: {
        root: {
          fontSize: '12px',
        },
      },
      toggleColumn: {
        minWidth: '20px',
        maxWidth: '20px',
        width: '20px',
      },
      column: {
        justifyContent: 'center',
      },
    };

    if (this.props.isExpanded) {
      styles.root.borderBottom = 'none';
    }

    if (!hasMembers(this.props.element)) {
      styles.root.borderBottom = `1px solid ${BORDER_COLOR}`;
    }

    return styles;
  }

  renderSampleToggle(styles) {
    if (
      this.props.parentElement && (
        isEnum(this.props.parentElement.element) ||
        hasSamples(this.props.parentElement.element)
      )
    ) {
      return (
        <SampleToggle
          onClick={this.props.onSampleToggleClick}
          style={styles.sampleToggle}
          isExpanded={this.props.isExpanded}
          sampleTitle={this.props.sampleTitle}
        />
      );
    }

    return null;
  };

  render() {
    const styles = this.renderStyles();

    let type;

    switch (this.props.element.element) {
      case 'enum':
        type = 'enum';
        break;
      case 'array':
        type = 'array';
        break;
      default:
        type = 'array';
    }

    return (
      <Row style={styles.root}>
        <Column style={styles.column}>
          <Type
            type={type}
            style={styles.type}
          />

          {this.renderSampleToggle(styles)}
        </Column>
      </Row>
    );
  };
}

export default ArrayHeader;
