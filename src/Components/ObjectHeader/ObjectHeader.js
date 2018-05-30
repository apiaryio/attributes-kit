import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import merge from 'lodash/merge';

import Row from '../Row/Row';
import Column from '../Column/Column';
import Type from '../Type/Type';
import Toggle from '../Toggle/Toggle';
import SampleToggle from '../SampleToggle/SampleToggle';

import {
  hasSamples,
  isArray,
  isEnum,
} from '../../Modules/ElementUtils/ElementUtils';

@Radium
class ObjectHeader extends React.Component {
  static propTypes = {
    element: PropTypes.object,
    expandableCollapsible: PropTypes.bool,
    isExpanded: PropTypes.bool,
    onSampleToggleClick: PropTypes.func,
    onToggleClick: PropTypes.func,
    onTypeClick: PropTypes.func,
    parentElement: PropTypes.object,
    style: PropTypes.object,
  };

  static contextTypes = {
    theme: PropTypes.object,
  };

  get style() {
    const { ALTERNATE_BORDER_COLOR } = this.context.theme;

    const style = {
      base: {
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
      style.base.height = '30px';
    }

    return merge(style, this.props.style || {});
  }

  renderSampleToggle() {
    if (this.props.element && hasSamples(this.props.element)) {
      return (
        <SampleToggle
          onClick={this.props.onSampleToggleClick}
          style={this.style.sampleToggle}
          isExpanded={this.props.isExpanded}
          sampleTitle="Description"
        />
      );
    }

    return null;
  }

  renderToggleColumn() {
    if (this.props.expandableCollapsible) {
      return (
        <Column style={this.style.toggleColumn}>
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
    return (
      <Row style={this.style.base}>
        {
          this.renderToggleColumn()
        }

        <Column>
          {
            (isArray(this.props.parentElement) || isEnum(this.props.parentElement)) &&
              <Type
                type="object"
                onClick={this.props.expandableCollapsible && this.props.onTypeClick}
              />
          }

          {
            this.renderSampleToggle()
          }
        </Column>
      </Row>
    );
  }
}

export default ObjectHeader;
