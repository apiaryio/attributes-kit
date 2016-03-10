import React from 'react';
import Error from '../Error/Error';
import refractToComponentsMap from '../refractToComponentMap';

import ParentInfo from '../ParentInfo/ParentInfo';

class Attribute extends React.Component {
  static propTypes = {
    theme: React.PropTypes.object,
    element: React.PropTypes.object,
    expandableCollapsible: React.PropTypes.bool,
    parentElement: React.PropTypes.object,
    collapseByDefault: React.PropTypes.bool,
  };

  static contextTypes = {
    showParentLinks: React.PropTypes.bool,
  }

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

    const renderedComponent = React.createElement(reactComponent, {
      collapseByDefault: this.props.collapseByDefault,
      element: this.props.element,
      expandableCollapsible: this.props.expandableCollapsible,
      parentElement: this.props.parentElement,
    });

    if (!(this.props.element.meta && this.props.element.meta.ref) || !this.context.showParentLinks) {
      return renderedComponent;
    }

    return (
      <div>
        <ParentInfo element={this.props.element}/>
        {renderedComponent}
      </div>
    );
  }
}

export default Attribute;
