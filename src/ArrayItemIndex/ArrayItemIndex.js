import React from 'react';


class ArrayItemIndex extends React.Component {
  static propTypes = {
    index: React.PropTypes.number,
  }

  renderStyles() {
    let styles = {
      root: {
        position: 'absolute',
        top: '8px',
        right: '8px',
        fontFamily: 'Source Code Pro',
        fontSize: '14px',
        color: '#C8CDD4',
        lineHeight: '18px',
      }
    };

    return styles;
  }

  render() {
    const styles = this.renderStyles();

    return (
      <span style={styles.root}>
        {this.props.index}
      </span>
    );
  }
}

export default ArrayItemIndex;
