import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import merge from 'lodash/merge';

class Ruler extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ]),
    style: PropTypes.object,
    subtle: PropTypes.bool,
  };

  static contextTypes = {
    theme: PropTypes.object,
  };

  get style() {
    const { BORDER_COLOR } = this.context.theme;

    const style = {
      base: {
        minWidth: '100%',
        maxWidth: '100%',
        height: 'auto',
      },
      container: {
        minWidth: '100%',
        maxWidth: '100%',
        width: '100%',
        borderLeft: `1px solid ${BORDER_COLOR}`,
        position: 'relative',
      },
      talon: {
        position: 'absolute',
        top: '-14px',
        left: '-1px',
        width: '1px',
        height: '14px',
        backgroundColor: BORDER_COLOR,
      },
    };

    if (this.props.subtle) {
      style.container.borderLeft = '1px solid transparent';
      style.talon.backgroundColor = 'transparent';
    }

    return merge(style, this.props.style || {});
  }

  render() {
    return (
      <div style={this.style.base}>
        <div style={this.style.container}>
          <div style={this.style.talon} />
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default radium(Ruler);
