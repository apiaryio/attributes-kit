import React from 'react';

import ObjectMember from 'ObjectMember/ObjectMember';
import Samples from 'Samples/Samples';


import './object.styl';

class ObjectComponent extends React.Component {
  static propTypes = {
    data: React.PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.props.data = this.props.data || [];
  }

  renderSamples() {
    let attributes = this.props.data.attributes;
    let samples = null;

    if (attributes) {
      samples = attributes.samples;
    }

    if (!samples) {
      return false;
    }

    return (
      <div className="attributeObjectSamplesContainer">
        <Samples data={samples} />
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

          {this.renderSamples()}
      </div>
    );
  }
}

export default ObjectComponent;
