import React from 'react';
import Error from '../Error/Error';
import refractToComponentsMap from '../../Resources/refractToComponentMap';

class Attribute extends React.Component {
  static propTypes = {
    theme: React.PropTypes.object,
    element: React.PropTypes.object,
    expandableCollapsible: React.PropTypes.bool,
    parentElement: React.PropTypes.object,
    collapseByDefault: React.PropTypes.bool,
    isSample: React.PropTypes.bool,
  };

  render() {
    if (!this.props.element) {
      return false;
    }

    const reactComponent = refractToComponentsMap[this.props.element.element];

    // If we didn't find the component which is able to render the specific
    // element, display an error message.
    if (typeof reactComponent === 'undefined') {
      const errorMessage = `
        Attributes Kit is not able to render the ‘${this.props.element.element}’
        element.
      `;

      return (
        <Error errorMessage={errorMessage} />
      );
    }

    const reactElement = React.createElement(reactComponent, {
      collapseByDefault: this.props.collapseByDefault,
      element: this.props.element,
      expandableCollapsible: this.props.expandableCollapsible,
      parentElement: this.props.parentElement,
      isSample: this.props.isSample,
    });

    return reactElement;
  }
}

export default Attribute;
