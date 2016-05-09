import React from 'react';
import radium from 'radium';

class ArrayItemIndex extends React.Component {
  static propTypes = {
    index: React.PropTypes.number,
  };

  get style() {
    const style = {
      base: {
        position: 'absolute',
        top: '8px',
        right: '8px',
        fontFamily: 'Source Code Pro',
        fontSize: '13px',
        color: '#8A93A3',
        opacity: '0.56',
      },
    };

    return style;
  };

  render() {
    return (
      <span style={this.style.base}>
        {this.props.index}
      </span>
    );
  };
}

export default radium(ArrayItemIndex);
