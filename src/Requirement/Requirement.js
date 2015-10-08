import React from 'react';
import classNames from 'classnames';

import Tooltip from 'Tooltip/Tooltip';

import './requirement.styl';

class Requirement extends React.Component {
  static propTypes = {
    requirement: React.PropTypes.string,
  }

  constructor(props) {
    super(props);

    this.CLASS_NAME = 'attributeRequirement';
  }

  getClassName() {
    return classNames(this.CLASS_NAME,
      this.props.requirement.map((req) => {
        return `is${req.charAt(0).toUpperCase() + req.substr(1)}`;
      }));
  }

  render() {
    return (
      <div className={this.getClassName()}>
        <span className="attributeRequirementIcon"></span>

        <span className="attributeRequirementTooltip">
          <Tooltip text={this.props.requirement.join(' ')} />
        </span>
      </div>
    );
  }
}

export default Requirement;
