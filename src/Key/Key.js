import React from 'react';

class Key extends React.Component {
  static propTypes = {
    index: React.PropTypes.number,
    element: React.PropTypes.object,
    onClick: React.PropTypes.func,
  }

  static contextTypes = {
    theme: React.PropTypes.object,
  }

  getStyles() {
    const { KEY_COLOR } = this.context.theme;

    this.styles = {
      key: {
        float: 'left',
        width: '100%',
        height: 'auto',
        fontFamily: 'Source Code Pro',
        fontWeight: '500',
        fontSize: '16px',
        color: KEY_COLOR,
        lineHeight: '18px',
      },
    };

    return this.styles;
  }

  getKey() {
    if (typeof this.props.index !== 'undefined') {
      return this.props.index;
    }

    if (this.props.element.element === 'member') {
      return this.props.element.content.key.content;
    }

    return undefined;
  }

  render() {
    const key = this.getKey();

    if (typeof key === 'undefined') {
      return false;
    }

    return (
      <div
        style={this.getStyles().key}
        onClick={this.props.onClick}
      >
        {key}
      </div>
    );
  }
}

export default Key;
