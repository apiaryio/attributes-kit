import React from 'react';
import radium from 'radium';
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
        fontFamily: 'Source Sans Pro',
        fontWeight: '600',
        fontSize: '14px',
        color: '#4C5264',
        borderBottom: '1px solid #EAEBEE',
      },
      bullet: {
        cursor: 'pointer',
        color: DESCRIPTION_COLOR,
        fontSize: '90%',
        textDecoration: 'none',
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

export default radium(ParentInfoLink);
