import React from 'react'

import BaseCyclingComponent from 'BaseCyclingComponent/BaseCyclingComponent';
import ObjectMemberComponent from 'ObjectMember/ObjectMember';

import './object.styl'

class ObjectComponent extends BaseCyclingComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul className="attributeObject">
        {this.props.data.map((member, index) => {
          return (
            <li
              className="attributeObjectMemberContainer"
              key={index}
            >
              <ObjectMemberComponent data={member} />
            </li>
          );
        })}
      </ul>
    );
  }
}

export default ObjectComponent;
