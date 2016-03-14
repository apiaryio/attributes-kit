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

    // If we didn't find the component which is able to render the specific
    // element, display an error message.
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

    // Component wasn't inherited, we can render the component directly, without
    // any info about parent.
    if (!(this.props.element.meta && this.props.element.meta.ref) || !this.context.showParentLinks) {
      return renderedComponent;
    }

    // Render the component with info about its parent.
    return (
      <div>
        <ParentInfo element={this.props.element} showBullet={true} />
        {renderedComponent}
      </div>
    );
  }
}

export default Attribute;
