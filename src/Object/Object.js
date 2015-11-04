import React from 'react';

import ObjectMember from 'ObjectMember/ObjectMember';
import Samples from 'Samples/Samples';
import Defaults from 'Defaults/Defaults';

import './object.styl';

class ObjectComponent extends React.Component {
  static propTypes = {
    data: React.PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.props.data.content = this.props.data.content || [];
  }

  renderDefaults() {
    const attributes = this.props.data.attributes;
    let defaults = null;

    if (attributes) {
      defaults = attributes.default;
    }

    if (!defaults) {
      return false;
    }

    return (
      <div className="attributeObjectDefaults">
        <Defaults data={defaults} />
      </div>
    );
  }

  render() {
    return (
      <div className="attributeObject">
        <div className="attributeObjectMembers">
          {this.props.data.content.map((member, index) => {
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

        {this.renderDefaults()}
      </div>
    );
  }
}

export default ObjectComponent;
