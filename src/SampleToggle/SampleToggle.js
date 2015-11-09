import React from 'react';
import _ from 'lodash';

import Column from 'Column/Column';
import Row from 'Row/Row';
import Toggle from 'Toggle/Toggle';


class SampleToggle extends React.Component {
  static propTypes = {
    onClick: React.PropTypes.func,
    sampleName: React.PropTypes.string,
  }

  renderStyles() {
    let styles = {
      root: {
        cursor: 'pointer',
      },
      iconColumn: {
        width: '12px',
        minWidth: '12px',
        maxWidth: '12px',
      },
      icon: {
        width: '12',
        height: '12px',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left center',
      },
      title: {
        lineHeight: '12px',
        fontFamily: 'Source Sans Pro',
        fontSize: '12px',
        color: '#A3A7B2',
        textTransform: 'uppercase',
        paddingLeft: '6px',
      }
    };

    if (this.props.isExpanded) {
      styles.icon.backgroundImage = `url(${require('./arrowExpanded.svg')})`;
      styles.icon.backgroundSize = '12px 7px';
    } else {
      styles.icon.backgroundImage = `url(${require('./arrowCollapsed.svg')})`;
      styles.icon.backgroundSize = '7px 12px';
    }

    return _.merge(styles, this.props.style || {});
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