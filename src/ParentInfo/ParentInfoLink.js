import React from 'react';
import merge from 'lodash/merge';

class ParentInfoLink extends React.Component {
  static propTypes = {
    element: React.PropTypes.object,
    show: React.PropTypes.bool,
  };

  static contextTypes = {
    onElementLinkClick: React.PropTypes.func,
  };

  get ref() {
    return this.props.element.meta && this.props.element.meta.ref;
  }

  render() {
    if (this.props.show === false) {
      return null;
    }

    return (
      <a href="#" onClick={this.context.onElementLinkClick}>{this.ref}</a>
    );
  };
}

export default ParentInfoLink;
