import React from 'react';
import Radium from 'radium';
import merge from 'lodash/merge';

import { MONO_FONT } from '../../Resources/fonts';

@Radium
class ArrayItemIndex extends React.Component {
  static propTypes = {
    index: React.PropTypes.number,
    style: React.PropTypes.object,
  };

  get style() {
    const style = {
      base: {
        position: 'absolute',
        top: '8px',
        right: '8px',
        fontFamily: MONO_FONT,
        fontSize: '13px',
        color: '#8A93A3',
        opacity: '0.56',
      },
    };

    return merge(style, this.props.style || {});
  };

  render() {
    return (
      <span style={this.style.base}>
        {this.props.index}
      </span>
    );
  };
}

export default ArrayItemIndex;
