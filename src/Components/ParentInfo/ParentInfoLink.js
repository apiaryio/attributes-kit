import React from 'react';
import radium from 'radium';
import merge from 'lodash/merge';

import {
  isInherited,
  isIncluded,
} from '../../Modules/ElementUtils/ElementUtils';

import { DEFAULT_FONT_FAMILY } from '../../Constants/fonts';

class ParentInfoLink extends React.Component {
  static propTypes = {
    element: React.PropTypes.object,
    style: React.PropTypes.object,
  };

  static contextTypes = {
    theme: React.PropTypes.object,
    onElementLinkClick: React.PropTypes.func,
  };

  get style() {
    const { DESCRIPTION_COLOR } = this.context.theme;

    const style = {
      base: {
        fontFamily: DEFAULT_FONT_FAMILY,
        fontStyle: 'italic',
        fontSize: '12px',
        color: DESCRIPTION_COLOR,
      },
      link: {
        cursor: 'pointer',

        ':hover': {
          textDecoration: 'underline',
        },
      },
    };

    return merge(style, this.props.style || {});
  };

  get ref() {
    return this.props.element.meta && this.props.element.meta.ref;
  }

  handleClick = (event) => {
    if (this.context.onElementLinkClick) {
      return this.context.onElementLinkClick(
        this.props.element.meta.ref, this.props.element, event);
    }

    return null;
  }

  render() {
    let text;

    if (isInherited(this.props.element)) {
      text = 'Inherited from';
    }

    if (isIncluded(this.props.element)) {
      text = 'Included from';
    }

    return (
      <span style={this.style.base}>
        {text}
        &nbsp;
        <a
          onClick={this.handleClick}
          style={this.style.link}
        >
          {this.ref}
        </a>
      </span>
    );
  };
}

export default radium(ParentInfoLink);
