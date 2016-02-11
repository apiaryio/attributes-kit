import React from 'react';

import Type from 'Type/Type';
import SampleToggle from 'SampleToggle/SampleToggle';
import Toggle from 'Toggle/Toggle';

import Row from 'Row/Row';
import Column from 'Column/Column';

import {
  hasSamples,
} from 'elements/element';


class ArrayHeader extends React.Component {
  static propTypes = {
    isExpanded: React.PropTypes.bool,
    element: React.PropTypes.object,
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

    return styles;
  }

  renderSampleToggle(styles) {
    if (this.props.parentElement && this.props.parentElement.element === 'enum') {
      return (
        <SampleToggle
          onClick={this.props.onSampleToggleClick}
          style={styles.sampleToggle}
          isExpanded={this.props.isExpanded}
          sampleTitle={this.props.sampleTitle}
        />
      );
    }
  };

  renderToggleColumn(styles) {
    if (this.props.parentElement && this.props.parentElement.element === 'enum') {
      return (
        <Column style={styles.toggleColumn}>
          <Toggle
            onClick={this.props.onToggleClick}
            isExpanded={this.props.isExpanded}
          />
        </Column>
      );
    }
  };

  render() {
    const styles = this.renderStyles();

    let type;

    switch(this.props.element.element) {
      case 'enum':
        type = 'enum';
        break;
      case 'array':
        type = 'array';
        break;
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
