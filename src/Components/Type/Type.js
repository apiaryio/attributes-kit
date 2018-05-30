import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import merge from 'lodash/merge';

import {
  getType,
  getReference,
  findElement,
} from '../../Modules/ElementUtils/ElementUtils';

import { MONO_FONT_FAMILY } from '../../Constants/fonts';

class Type extends React.Component {
  static propTypes = {
    type: PropTypes.string,
    reference: PropTypes.string,
    element: PropTypes.object,
    onClick: PropTypes.func,
    style: PropTypes.object,
  };

  static contextTypes = {
    theme: PropTypes.object,
    onElementLinkClick: PropTypes.func,
    dereferencedDataStructures: PropTypes.array,
  };

  get style() {
    const { TYPE_COLOR } = this.context.theme;

    const style = {
      type: {
        width: '100%',
        fontFamily: MONO_FONT_FAMILY,
        fontWeight: 'regular',
        fontSize: '13px',
        color: TYPE_COLOR,
        lineHeight: '13px',
      },
      reference: {
        width: '100%',
        fontFamily: MONO_FONT_FAMILY,
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
    const reference = getReference(this.props.element);
    const element = findElement(reference, this.context.dereferencedDataStructures);

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
