import React from 'react';

import './requirement.styl'

class RequirementComponent extends React.Component {

  render() {
    let requirement = ['optional'];

    if (this.props.data.attributes) {
      if (this.props.data.attributes.typeAttributes) {
        requirement = this.props.data.attributes.typeAttributes;
      }
    }

    const classes = requirement.map((req) => `is${req.charAt(0).toUpperCase() + req.substr(1)}`);
    classes.push('requirementContents');

    return (
      <div className="{classes.join(' ')}">
        {requirement.join(' ')}
      </div>
    );
  }
}

export default RequirementComponent;
