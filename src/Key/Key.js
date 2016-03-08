import isUndefined from 'lodash/isUndefined';
import merge from 'lodash/merge';
import radium from 'radium';
import React from 'react';

import {
  isExpandableCollapsible
} from '../elements/expandableCollapsibleElement';

class Key extends React.Component {
  static propTypes = {
    index: React.PropTypes.number,
    element: React.PropTypes.object,
    onClick: React.PropTypes.func,
  };

  static contextTypes = {
    theme: React.PropTypes.object,
  };

  get style() {
    const { KEY_COLOR } = this.context.theme;

    let style = {
      base: {
        width: '100%',
        height: 'auto',
        fontFamily: 'Source Code Pro',
        fontWeight: '500',
        fontSize: '16px',
        color: KEY_COLOR,
        lineHeight: '18px',
        userSelect: 'none',
      },
    };

    const isClickable = isUndefined(this.props.index)
      && this.props.element
      && isExpandableCollapsible(this.props.element);

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

export default radium(Key);
