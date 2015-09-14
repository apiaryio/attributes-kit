import React from 'react';

import ObjectMember from 'ObjectMember/ObjectMember';

import './object.styl';

class ObjectComponent extends React.Component {
  constructor(props) {
    super(props);

    this.props.data = this.props.data || [];
  }

  render() {
    return (
      <div className="attributeObject">
        <div className="attributeObjectMembers">
          {this.props.data.map((member, index) => {
            return (
              <div
                className="attributeObjectMemberContainer"
                key={index}
              >
                <ObjectMember data={member} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

ObjectComponent.propTypes = {
  data: React.PropTypes.object,
};

export default ObjectComponent;
