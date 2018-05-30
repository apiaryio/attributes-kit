import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import merge from 'lodash/merge';

import Column from '../Column/Column';
import Row from '../Row/Row';

import { DEFAULT_FONT_FAMILY } from '../../Constants/fonts';

@Radium
class SampleToggle extends React.Component {
  static propTypes = {
    onClick: PropTypes.func,
    sampleName: PropTypes.string,
    isExpanded: PropTypes.bool,
    style: PropTypes.object,
    sampleTitle: PropTypes.string,
  };

  static contextTypes = {
    theme: PropTypes.object,
  };

  renderStyles() {
    const { SAMPLE_TOGGLE_TITLE_COLOR } = this.context.theme;

    const styles = {
      root: {
        cursor: 'pointer',
      },
      iconColumn: {
        width: '12px',
        minWidth: '12px',
        maxWidth: '12px',
      },
      icon: {
        width: '12px',
        height: '12px',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left center',
      },
      title: {
        userSelect: 'none',
        lineHeight: '12px',
        letterSpacing: '0.85px',
        fontFamily: DEFAULT_FONT_FAMILY,
        fontSize: '12px',
        color: SAMPLE_TOGGLE_TITLE_COLOR,
        textTransform: 'uppercase',
        paddingLeft: '6px',
      },
    };

    if (this.props.isExpanded) {
      styles.icon.backgroundImage = `url(${require('./arrowExpanded.svg')})`;
      styles.icon.backgroundSize = '12px 7px';
    } else {
      styles.icon.backgroundImage = `url(${require('./arrowCollapsed.svg')})`;
      styles.icon.backgroundSize = '7px 12px';
    }

    return merge(styles, this.props.style || {});
  }

  render() {
    return (
      <Row style={this.renderStyles().root} onClick={this.props.onClick}>
        <Column style={this.renderStyles().iconColumn}>
          <div style={this.renderStyles().icon}></div>
        </Column>

        <Column>
          <div style={this.renderStyles().title}>{this.props.sampleTitle || 'Sample'}</div>
        </Column>
      </Row>
    );
  }
}

export default SampleToggle;
