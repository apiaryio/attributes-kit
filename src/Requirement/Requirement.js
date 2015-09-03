import React from 'react';

import TooltipComponent from 'Tooltip/Tooltip';

import './requirement.styl'

class RequirementComponent extends React.Component {
  constructor(props) {
    super(props);

    this.CLASS_NAME = 'attributeRequirement';

    this.setRequirement();
  }

  setRequirement() {
    this.requirement = ['optional'];

    if (this.props.data.attributes) {
      if (this.props.data.attributes.typeAttributes) {
        this.requirement = this.props.data.attributes.typeAttributes;
      }
    }
  }

  getClassName() {
    var classNames = this.requirement.map((req) =>
      `is${req.charAt(0).toUpperCase() + req.substr(1)}`
    );

    classNames.push(this.CLASS_NAME);
    return classNames.join(' ');
  }

  render() {
    return (
      <div className={this.getClassName()}>
        <span className="attributeRequirementIcon"></span>

        <span className="attributeRequirementTooltip">
          <TooltipComponent text={this.requirement.join(' ')} />
        </span>
      </div>
    );
  }
}

export default RequirementComponent;
