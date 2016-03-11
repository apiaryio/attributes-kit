import React from 'react';
import merge from 'lodash/merge';

class ParentInfoLink extends React.Component {
  static propTypes = {
    element: React.PropTypes.object,
    show: React.PropTypes.bool,
    showBullet: React.PropTypes.bool,
  };

  static contextTypes = {
    theme: React.PropTypes.object,
    onElementLinkClick: React.PropTypes.func,
  };

  get style() {
    const { DESCRIPTION_COLOR } = this.context.theme;

    const style = {
      base: {
        cursor: 'pointer',
        color: DESCRIPTION_COLOR,
        fontStyle: 'italic',
        fontSize: '90%',
        textDecoration: 'underline',
      },
      bullet: {
        cursor: 'pointer',
        color: DESCRIPTION_COLOR,
        fontSize: '90%',
        textDecoration: 'underline',
      },
    };

    return merge(style, this.props.style || {});
  };

  get ref() {
    return this.props.element.meta && this.props.element.meta.ref;
  }

  handleClick(event) {
    if (this.context.onElementLinkClick) {
      return this.context.onElementLinkClick(
        this.props.element.meta.ref, this.props.element, event);
    }
  }

  render() {
    if (this.props.show === false) {
      return null;
    }

    return (
      <a onClick={this.handleClick.bind(this)}>
        {
          this.props.showBullet === true && this.ref &&
          <span style={this.style.bullet}>▸&nbsp;</span>
        }
        <span style={this.style.base}>{this.ref}</span>
      </a>
    );
  };
}

export default ParentInfoLink;
