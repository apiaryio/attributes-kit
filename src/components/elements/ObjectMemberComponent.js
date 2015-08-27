import React from 'react';
import KeyComponent from '../renderers/KeyComponent';
import ValueComponent from '../renderers/ValueComponent';
import RequirementComponent from '../renderers/RequirementComponent';

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
