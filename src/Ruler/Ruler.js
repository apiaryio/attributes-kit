import React from 'react';
import radium from 'radium';
import merge from 'lodash/merge';

class Ruler extends React.Component {
  static propTypes = {
    children: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.array,
    ]),
    style: React.PropTypes.object,
  };

  static contextTypes = {
    theme: React.PropTypes.object,
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
      },
    };

    return merge(style, this.props.style || {});
  }

  render() {
    return (
      <div style={this.style.base}>
        <div style={this.style.container}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default radium(Ruler);
