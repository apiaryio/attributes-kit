import React from 'react';
import Error from '../Error/Error';
import refractToComponentsMap from '../refractToComponentMap';

class Attribute extends React.Component {
  static propTypes = {
    theme: React.PropTypes.object,
    element: React.PropTypes.object,
    expandableCollapsible: React.PropTypes.bool,
    parentElement: React.PropTypes.object,
  };

  render() {
    if (!this.props.element) {
      return false;
    }

    const reactComponent = refractToComponentsMap[this.props.element.element];

    if (typeof reactComponent === 'undefined') {
      const errorMessage = `
        Attributes Kit is not able to render ‘${this.props.element.element}’
        element.
      `;

      return (
        <Error errorMessage={errorMessage} />
      );
    }

    return React.createElement(reactComponent, {
      collapseByDefault: this.props.collapseByDefault,
      element: this.props.element,
      expandableCollapsible: this.props.expandableCollapsible,
      parentElement: this.props.parentElement,
    });
  }
}

export default Attribute;
