import React from 'react';
import lodash from 'lodash';

import refractToComponentsMap from 'refractToComponentMap';

import theme from 'theme';

class Attribute extends React.Component {
  static propTypes = {
    theme: React.PropTypes.object,
    element: React.PropTypes.object,
    expandableCollapsible: React.PropTypes.bool,
    parentElement: React.PropTypes.object,
  }

  static childContextTypes = {
    theme: React.PropTypes.object,
  }

  constructor(props) {
    super(props);
  }

  getChildContext() {
    return {
      theme: lodash.merge(this.props.theme || {}, theme),
    };
  }

  render() {
    if (!this.props.element) {
      return false;
    }

    const reactComponent = refractToComponentsMap[this.props.element.element];

    if (typeof reactComponent === 'undefined') {
      return new Error(`Unable to find a rendering component for ${this.props.element.element}`);
    }

    return React.createElement(reactComponent, {
      element: this.props.element,
      expandableCollapsible: this.props.expandableCollapsible,
      parentElement: this.props.parentElement,
    });
  }
}

export default Attribute;
