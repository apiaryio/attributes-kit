import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';

import refractToComponentsMap from '../refractToComponentMap';

import defaultTheme from '../theme';

class Attribute extends React.Component {
  static propTypes = {
    theme: React.PropTypes.object,
    element: React.PropTypes.object,
    expandableCollapsible: React.PropTypes.bool,
    parentElement: React.PropTypes.object,
  };

  static childContextTypes = {
    theme: React.PropTypes.object,
  };

  getChildContext() {
    let theme;

    // First, make a deep clone of the default theme object
    // to prevent future mutations; then we'll merge in custom theme.
    theme = cloneDeep(defaultTheme);
    theme = merge(theme, this.props.theme || {});

    return {
      theme,
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
