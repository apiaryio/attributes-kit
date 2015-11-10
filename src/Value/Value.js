import React from 'react';
import lodash from 'lodash';

import {
  isObjectOrArray,
  isMember,
} from 'elements/element';

class Value extends React.Component {
  static propTypes = {
    value: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
      React.PropTypes.bool,
    ]),
    element: React.PropTypes.object,
    style: React.PropTypes.object,
  }

  static contextTypes = {
    theme: React.PropTypes.object,
  }

  renderStyles() {
    const {
      VALUE_COLOR,
      VALUE_BACKGROUND_COLOR,
      VALUE_BORDER_RADIUS,
    } = this.context.theme;

    const styles = {
      float: 'left',
      width: 'auto',
      height: 'auto',
      margin: '0',
      padding: '0',
      fontWeight: '600',
      backgroundColor: VALUE_BACKGROUND_COLOR,
      borderRadius: VALUE_BORDER_RADIUS,
      paddingTop: '2px',
      paddingBottom: '2px',
      paddingLeft: '4px',
      paddingRight: '4px',
      fontFamily: 'Source Sans Pro',
      fontSize: '15px',
      color: VALUE_COLOR,
      lineHeight: '19px',
    };

    return lodash.merge(styles, this.props.style || {});
  }

  render() {
    if (this.props.value) {
      return (
        <div style={this.renderStyles()}>
          {this.props.value}
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
        <div style={this.renderStyles()}>
          {value}
        </div>
      );
    }
  }
}

export default Value;
