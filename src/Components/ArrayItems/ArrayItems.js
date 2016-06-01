import React from 'react';
import Radium from 'radium';
import merge from 'lodash/merge';

@Radium
class ArrayItems extends React.Component {
  static propTypes = {
    style: React.PropTypes.object,
    children: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.array,
    ]),
  };

  get style() {
    const style = {
      base: {
        width: '100%',
        height: 'auto',
      },
    };

    return merge(style, this.props.style || {});
  }

  render() {
    return (
      <div style={this.style.base}>
        {this.props.children}
      </div>
    );
  }
}

export default ArrayItems;
