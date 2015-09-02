import React from 'react';

import KeyComponent from '../Key/KeyComponent';
import ValueComponent from '../Value/ValueComponent';
import RequirementComponent from '../Requirement/RequirementComponent';

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
