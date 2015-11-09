import React from 'react';

import Row from 'Row/Row';
import Column from 'Column/Column';

import Type from 'Type/Type';
import Toggle from 'Toggle/Toggle';
import SampleToggle from 'SampleToggle/SampleToggle';

import {
  hasSamples,
  isArray,
} from 'elements/element';

class ObjectHeader extends React.Component {
  static propTypes = {

  }

  renderStyles() {
    let styles = {
      root: {
        borderBottom: '1px solid #E8EBEE',
        paddingBottom: '8px',
        paddingLeft: '0px',
        paddingTop: '4px',
      },
      toggleColumn: {
        minWidth: '20px',
        maxWidth: '20px',
        width: '20px',
      },
      type: {
        root: {
          fontSize: '12px'
        }
      },
      sampleToggle: {
        root: {
          marginTop: '4px',
        }
      },
    };

    if (this.props.expandableCollapsible) {
      styles.root.borderBottom = 'none';
      styles.type.root.lineHeight = '18px';

      if (this.props.isExpanded) {
        styles.root.paddingBottom = '4px';
      } else {
        styles.root.paddingBottom = '8px';
      }
    }

    if (this.props.parentElement && isArray(this.props.parentElement)) {
      styles.type.root.fontSize = '14px';
    }

    return styles;
  };

  renderSampleToggle(styles) {
    if (this.props.element && hasSamples(this.props.element)) {
      return (
        <SampleToggle
          onClick={this.props.onSampleToggleClick}
          style={styles.sampleToggle}
          isExpanded={this.props.isExpanded}
          sampleTitle="Description"
        />
      );
    }
  }

  renderToggleColumn(styles) {
    if (this.props.expandableCollapsible) {
      return (
        <Column style={styles.toggleColumn}>
          <Toggle
            onClick={this.props.onToggleClick}
            isExpanded={this.props.isExpanded}
          />
        </Column>
      );
    }
  }

  render() {
    const styles = this.renderStyles();

    return (
      <Row style={styles.root}>
        {this.renderToggleColumn(styles)}

        <Column>
          <Type
            type="object"
            style={styles.type}
            onClick={this.props.onTypeClick}
          />

          {this.renderSampleToggle(styles)}
        </Column>
      </Row>
    );
  }
}

export default ObjectHeader;
