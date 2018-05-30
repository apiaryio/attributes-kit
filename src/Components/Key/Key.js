import isUndefined from 'lodash/isUndefined';
import merge from 'lodash/merge';
import Radium from 'radium';
import React from 'react';
import PropTypes from 'prop-types';

import { MONO_FONT_FAMILY } from '../../Constants/fonts';

import {
  containsStructuredElement,
} from '../../Modules/ElementUtils/ElementUtils';

@Radium
class Key extends React.Component {
  static propTypes = {
    element: PropTypes.object,
    index: PropTypes.number,
    onClick: PropTypes.func,
    style: PropTypes.object,
  };

  static contextTypes = {
    theme: PropTypes.object,
  };

  get style() {
    const { KEY_COLOR } = this.context.theme;

    const style = {
      base: {
        width: '100%',
        height: 'auto',
        fontFamily: MONO_FONT_FAMILY,
        fontWeight: '500',
        fontSize: '13px',
        lineHeight: '13px',
        color: KEY_COLOR,
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
