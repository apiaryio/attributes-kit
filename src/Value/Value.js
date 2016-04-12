import React from 'react';
import merge from 'lodash/merge';
import Radium from 'radium';

import {
  isObjectOrArray,
  isMember,
} from '../elements/element';

@Radium
class Value extends React.Component {
  static propTypes = {
    value: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
      React.PropTypes.bool,
    ]),
    element: React.PropTypes.object,
    style: React.PropTypes.object,
  };

  static contextTypes = {
    theme: React.PropTypes.object,
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
        margin: '0px',
        fontWeight: VALUE_FONT_WEIGHT,
        backgroundColor: VALUE_BACKGROUND_COLOR,
        borderRadius: VALUE_BORDER_RADIUS,
        paddingTop: VALUE_PADDING_TOP,
        paddingBottom: VALUE_PADDING_BOTTOM,
        paddingLeft: VALUE_PADDING_LEFT,
        paddingRight: VALUE_PADDING_RIGHT,
        fontFamily: 'Source Sans Pro',
        fontSize: '13px',
        lineHeight: '13px',
        color: VALUE_COLOR,
      },
    };

    return merge(style, this.props.style || {});
  }

  render() {
    if (this.props.value) {
      return (
        <div style={this.style.base}>
          {this.props.value.toString()}
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

export default Value;
