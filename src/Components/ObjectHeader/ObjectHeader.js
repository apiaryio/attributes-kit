import React from 'react';

import Row from '../Row/Row';
import Column from '../Column/Column';

import Type from '../Type/Type';
import Toggle from '../Toggle/Toggle';
import SampleToggle from '../SampleToggle/SampleToggle';

import {
  hasSamples,
  isArray,
} from '../../Modules/ElementUtils/ElementUtils';

class ObjectHeader extends React.Component {
  static propTypes = {
    expandableCollapsible: React.PropTypes.bool,
    parentElement: React.PropTypes.object,
    element: React.PropTypes.object,
    isExpanded: React.PropTypes.bool,
    onTypeClick: React.PropTypes.func,
    onToggleClick: React.PropTypes.func,
    onSampleToggleClick: React.PropTypes.func,
  };

  static contextTypes = {
    theme: React.PropTypes.object,
  };

  renderStyles() {
    const { ALTERNATE_BORDER_COLOR } = this.context.theme;

    const styles = {
      root: {
        borderBottom: `1px solid ${ALTERNATE_BORDER_COLOR}`,
        paddingLeft: '10px',
        paddingRight: '10px',
        alignItems: 'center',
      },
      toggleColumn: {
        minWidth: '20px',
        maxWidth: '20px',
        width: '20px',
      },
      sampleToggle: {
        root: {
          marginTop: '4px',
        },
      },
    };

    if (isArray(this.props.parentElement)) {
      styles.root.height = '30px';
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
          sampleTitle="Description"
        />
      );
    }

    return null;
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

    return null;
  }

  render() {
    const styles = this.renderStyles();

    return (
      <Row style={styles.root}>
        {
          this.renderToggleColumn(styles)
        }

        <Column>
          {
            isArray(this.props.parentElement) &&
              <Type
                type="object"
                onClick={this.props.expandableCollapsible && this.props.onTypeClick}
              />
          }

          {
            this.renderSampleToggle(styles)
          }
        </Column>
      </Row>
    );
  }
}

export default ObjectHeader;
