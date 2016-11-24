import isUndefined from 'lodash/isUndefined';
import merge from 'lodash/merge';
import Radium from 'radium';
import React from 'react';

import {
  containsStructuredElement,
} from '../../Modules/ElementUtils/ElementUtils';

@Radium
class Key extends React.Component {
  static propTypes = {
    element: React.PropTypes.object,
    index: React.PropTypes.number,
    onClick: React.PropTypes.func,
    style: React.PropTypes.object,
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
        fontSize: '13px',
        lineHeight: '13px',
        color: KEY_COLOR,
        userSelect: 'none',
        wordBreak: 'keep-all',
        wordWrap: 'normal',
      },
    };

    const isClickable = isUndefined(this.props.index)
      && this.props.element
      && containsStructuredElement(this.props.element);

    if (isClickable) {
      style.base.cursor = 'pointer';
    }

    return merge(style, this.props.style || {});
  };

  get key() {
    if (!isUndefined(this.props.index)) {
      return this.props.index;
    }

    if (this.props.element.element === 'member') {
      return this.props.element.content.key.content;
    }

    return undefined;
  };

  render() {
    if (isUndefined(this.key)) {
      return false;
    }

    return (
      <div
        style={this.style.base}
        onClick={this.props.onClick}
      >
        {this.key}
      </div>
    );
  };
}

export default Key;
