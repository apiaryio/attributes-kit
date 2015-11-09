import React from 'react';
import _ from 'lodash';

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
  }

  renderStyles() {
    let styles = {
      float: 'left',
      width: 'auto',
      height: 'auto',
      margin: '0',
      padding: '0',
      fontWeight: '600',
      backgroundColor: '#f0f1f4',
      borderRadius: '4px',
      paddingTop: '2px',
      paddingBottom: '2px',
      paddingLeft: '4px',
      paddingRight: '4px',
      fontFamily: 'Source Sans Pro',
      fontSize: '15px',
      color: '#4C5264',
      lineHeight: '19px',
    };

    return _.merge(styles, this.props.style || {});
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
