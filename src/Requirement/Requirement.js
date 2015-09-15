import React from 'react';
import classNames from 'classnames';

import Tooltip from 'Tooltip/Tooltip';

import './requirement.styl';

class Requirement extends React.Component {
  static propTypes = {
    data: React.PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.CLASS_NAME = 'attributeRequirement';
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
    return classNames(this.CLASS_NAME,
      this.requirement.map((req) => {
        return `is${req.charAt(0).toUpperCase() + req.substr(1)}`;
      }));
  }

  render() {
    this.setRequirement();

    return (
      <div className={this.getClassName()}>
        <span className="attributeRequirementIcon"></span>

        <span className="attributeRequirementTooltip">
          <Tooltip text={this.requirement.join(' ')} />
        </span>
      </div>
    );
  }
}

export default Requirement;
