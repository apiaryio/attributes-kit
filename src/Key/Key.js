import React from 'react';


class Key extends React.Component {
  static propTypes = {
    index: React.PropTypes.number,
    data: React.PropTypes.object,
    onClick: React.PropTypes.function,
  }

  getStyles() {
    this.styles = {
      key: {
        float: 'left',
        width: '100%',
        height: 'auto',
        fontFamily: 'Source Code Pro',
        fontWeight: '500',
        fontSize: '16px',
        color: '#4C5264',
        lineHeight: '18px',
      },
    };

    return this.styles;
  }

  getKey() {
    if (typeof this.props.index !== 'undefined') {
      return this.props.index;
    }

    if (this.props.data.element === 'member') {
      return this.props.data.content.key.content;
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
