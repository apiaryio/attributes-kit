import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import merge from 'lodash/merge';

import { MONO_FONT_FAMILY } from '../../Constants/fonts';

@Radium
class ArrayItemIndex extends React.Component {
  static propTypes = {
    index: PropTypes.number,
    style: PropTypes.object,
  };

  get style() {
    const style = {
      base: {
        position: 'absolute',
        top: '8px',
        right: '8px',
        fontFamily: MONO_FONT_FAMILY,
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
