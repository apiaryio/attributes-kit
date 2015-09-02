import React from 'react';

import KeyComponent from '../Key/Key';
import ValueComponent from '../Value/Value';
import RequirementComponent from '../Requirement/Requirement';

class ObjectMemberComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="objectMemeber">
        <div className="key">
          <KeyComponent data={this.props.data} />
        </div>
        <div className="requirement">
          <RequirementComponent data={this.props.data} />
        </div>
        <div className="value">
          <ValueComponent data={this.props.data} />
        </div>
      </div>
    );
  }
}

export default ObjectMemberComponent;
