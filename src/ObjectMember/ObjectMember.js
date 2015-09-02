import React from 'react';

import KeyComponent from 'Key/Key';
import ValueComponent from 'Value/Value';
import RequirementComponent from 'Requirement/Requirement';

import './objectMember.styl'

class ObjectMemberComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="attributeObjectMemeber">
        <div className="attributeObjectMemeberKey">
          <KeyComponent data={this.props.data} />
        </div>

        <div className="attributeObjectMemeberRequirement">
          <RequirementComponent data={this.props.data} />
        </div>

        <div className="attributeObjectMemeberDescription">

          <div className="attributeObjectMemeberValue">
            <ValueComponent data={this.props.data} />
          </div>
        </div>

      </div>
    );
  }
}

export default ObjectMemberComponent;
