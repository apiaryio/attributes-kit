import merge from 'lodash/merge';
import radium from 'radium';
import React from 'react';

class Key extends React.Component {
  static propTypes = {
    index: React.PropTypes.number,
    element: React.PropTypes.object,
    onClick: React.PropTypes.func,
  };

  static contextTypes = {
    theme: React.PropTypes.object,
  };

  get style() {
    const { KEY_COLOR } = this.context.theme;

    const style = {
      base: {
        width: '100%',
        height: 'auto',
        fontFamily: 'Source Code Pro',
        fontWeight: '500',
        fontSize: '16px',
        color: KEY_COLOR,
        lineHeight: '18px',
      },
    };

    return merge(style, this.props.style || {});
  };

  getKey() {
    if (typeof this.props.index !== 'undefined') {
      return this.props.index;
    }

    if (this.props.element.element === 'member') {
      return this.props.element.content.key.content;
    }

    return undefined;
  };

  render() {
    const key = this.getKey();

    if (typeof key === 'undefined') {
      return false;
    }

    return (
      <div
        style={this.style.base}
        onClick={this.props.onClick}
      >
        {key}
      </div>
    );
  };
}

export default radium(Key);
