import React from 'react';
import radium from 'radium';
import merge from 'lodash/merge';

import {
  getType,
  findElement,
} from '../elements/element';

class Type extends React.Component {
  static propTypes = {
    type: React.PropTypes.string,
    reference: React.PropTypes.bool,
    element: React.PropTypes.object,
    onClick: React.PropTypes.func,
    style: React.PropTypes.object,
  };

  static contextTypes = {
    theme: React.PropTypes.object,
    onElementLinkClick: React.PropTypes.func,
    dereferencedDataStructures: React.PropTypes.array,
  };

  get style() {
    const { TYPE_COLOR } = this.context.theme;

    const style = {
      type: {
        width: '100%',
        fontFamily: 'Source Code Pro',
        fontWeight: 'regular',
        fontSize: '13px',
        color: TYPE_COLOR,
        marginBottom: '4px',
      },
      reference: {
        width: '100%',
        fontFamily: 'Source Code Pro',
        fontWeight: 'regular',
        fontSize: '13px',
        color: TYPE_COLOR,
        textDecoration: 'underline',
        cursor: 'pointer',

        ':hover': {
          textDecoration: 'none',
        },
      },
    };

    return merge(style, this.props.style || {});
  }

  handleClick = (event) => {
    const element = findElement(this.props.type, this.context.dereferencedDataStructures);

    if (this.context.onElementLinkClick) {
      return this.context.onElementLinkClick(
        element.meta.id, element, event
      );
    }

    return null;
  }

  render() {
    if (this.props.reference) {
      return (
        <div
          style={this.style.reference}
          onClick={this.handleClick}
        >
          {this.props.reference}
        </div>
      );
    }

    if (this.props.type) {
      return (
        <div style={this.style.type}>
          {this.props.type}
        </div>
      );
    }

    if (this.props.element) {
      const type = getType(this.props.element);

      if (type) {
        return (
          <div style={this.style.type}>
            {type}
          </div>
        );
      }
    }

    return null;
  }
}

export default radium(Type);
