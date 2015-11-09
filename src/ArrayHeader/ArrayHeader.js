import React from 'react';

import Type from 'Type/Type';
import SampleToggle from 'SampleToggle/SampleToggle';

import {
  hasSamples,
} from 'elements/element';


class ArrayHeader extends React.Component {
  static propTypes = {
    isExpanded: React.PropTypes.boolean,
    element: React.PropTypes.object,
    onSampleToggleClick: React.PropTypes.function,
    sampleTitle: React.PropTypes.string,
  }

  renderStyles() {
    const styles = {
      root: {
        border: '1px solid #E8EBEE',
        borderBottom: '1px solid #E8EBEE',
        height: 'auto',
        paddingBottom: '6px',
        paddingLeft: '8px',
        paddingTop: '4px',
        width: '100%',
        backgroundColor: '#F8F8F9',
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
    };

    if (this.props.isExpanded) {
      styles.root.borderBottom = 'none';
    }

    return styles;
  }

  renderSampleToggle(styles) {
    if (this.props.element && hasSamples(this.props.element)) {
      return (
        <SampleToggle
          onClick={this.props.onSampleToggleClick}
          style={styles.sampleToggle}
          isExpanded={this.props.isExpanded}
          sampleTitle={this.props.sampleTitle}
        />
      );
    }
  }

  render() {
    const styles = this.renderStyles();

    return (
      <div style={styles.root}>
        <Type
          type="array"
          style={styles.type} />

        {this.renderSampleToggle(styles)}
      </div>
    );
  }
}

export default ArrayHeader;
