import isEmpty from 'lodash/isEmpty';
import merge from 'lodash/merge';
import Radium from 'radium';
import React from 'react';

import { DEFAULT_FONT } from '../../Resources/fonts';

@Radium
class Title extends React.Component {
  static propTypes = {
    element: React.PropTypes.object,
    style: React.PropTypes.object,
  };

  get style() {
    const style = {
      base: {
        paddingBottom: '10px',
      },
      text: {
        fontFamily: DEFAULT_FONT,
        fontSize: '18px',
        color: '#30343F',
      },
    };

    return merge(style, this.props.style || {});
  }

  render() {
    if (!this.props.element) {
      return null;
    }

    if (isEmpty(this.props.element.meta)) {
      return null;
    }

    if (!this.props.element.meta.id) {
      return null;
    }

    return (
      <div style={this.style.base}>
        <h1 style={this.style.text}>
          {this.props.element.meta.id}
        </h1>
      </div>
    );
  }
}

export default Title;
