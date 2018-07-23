import isUndefined from 'lodash/isUndefined';

import React from 'react';
import PropTypes from 'prop-types';
import merge from 'lodash/merge';
import Radium from 'radium';

import {
  isObjectOrArray,
  isMember,
} from '../../Modules/ElementUtils/ElementUtils';

import { DEFAULT_FONT_FAMILY } from '../../Constants/fonts';

@Radium
class PrimitiveValue extends React.Component {
  static propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
    ]),
    element: PropTypes.object,
    style: PropTypes.object,
  };

  static contextTypes = {
    theme: PropTypes.object,
  };

  get style() {
    const {
      VALUE_BACKGROUND_COLOR,
      VALUE_BORDER_RADIUS,
      VALUE_COLOR,
      VALUE_FONT_WEIGHT,
      VALUE_PADDING_BOTTOM,
      VALUE_PADDING_LEFT,
      VALUE_PADDING_RIGHT,
      VALUE_PADDING_TOP,
    } = this.context.theme;

    const style = {
      base: {
        width: 'auto',
        height: 'auto',
        marginTop: '0px',
        marginBottom: '0px',
        marginLeft: '0px',
        marginRight: '0px',
        fontWeight: VALUE_FONT_WEIGHT,
        backgroundColor: VALUE_BACKGROUND_COLOR,
        borderRadius: VALUE_BORDER_RADIUS,
        paddingTop: VALUE_PADDING_TOP,
        paddingBottom: VALUE_PADDING_BOTTOM,
        paddingLeft: VALUE_PADDING_LEFT,
        paddingRight: VALUE_PADDING_RIGHT,
        fontFamily: DEFAULT_FONT_FAMILY,
        fontSize: '13px',
        lineHeight: '13px',
        color: VALUE_COLOR,
        wordBreak: 'break-word',
      },
    };

    return merge(style, this.props.style || {});
  }

  render() {
    if (this.props.value === null) {
      return null;
    }

    if (!isUndefined(this.props.value)) {
      return (
        <div style={this.style.base}>
          {
            this.props.value.toString()
          }
        </div>
      );
    }

    if (this.props.element) {
      const element = this.props.element;
      let value;

      if (isObjectOrArray(element.element)) {
        return false;
      } else if (isMember(element.element)) {
        if (isObjectOrArray(element.content.value.element)) {
          return false;
        } else if (element.content.value.content) {
          value = element.content.value.content;
        } else {
          return false;
        }
      } else if (element.content) {
        value = element.content;
      }

      if (!value) {
        return false;
      }

      return (
        <div style={this.style.base}>
          {value.toString()}
        </div>
      );
    }

    return null;
  }
}

export { PrimitiveValue };
