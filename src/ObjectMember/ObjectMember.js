import React from 'react';

import AttributeComponent from 'Attribute/Attribute';
import KeyComponent from 'Key/Key';
import ValueComponent from 'Value/Value';
import RequirementComponent from 'Requirement/Requirement';

import './objectMember.styl'

class ObjectMemberComponent extends React.Component {
  constructor(props) {
    super(props);

    this.setValue(props.data)
  }

  isObjectOrArray(element) {
    ['object', 'array'].indexOf(element) > -1
  }

  setValue(data) {
    this.value = false;

    if (this.isObjectOrArray(data.element)) {
      this.value = <AttributeComponent data={data.content} />;
    } else if (data.element === 'member') {
      if (this.isObjectOrArray(data.content.value.element)) {
        this.value = <AttributeComponent data={data.content.value} />;
      } else {
        this.value = <ValueComponent value={data.content.value.content} />;
      }
    } else {
      this.value = <ValueComponent value={data.content} />;
    }
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
        </div>

        <div className="attributeObjectMemeberValue">
          {this.value}
        </div>

      </div>
    );
  }
}

export default ObjectMemberComponent;
