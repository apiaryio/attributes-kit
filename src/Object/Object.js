import React from 'react';

import ObjectMember from 'ObjectMember/ObjectMember';
import Samples from 'Samples/Samples';
import Defaults from 'Defaults/Defaults';

import './object.styl';

class ObjectComponent extends React.Component {
  static propTypes = {
    content: React.PropTypes.array,
    attributes: React.PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.props.content = this.props.content || [];
  }

  renderSamples() {
    const attributes = this.props.attributes;
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

  renderDefaults() {
    const attributes = this.props.attributes;
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
          {this.props.content.map((member, index) => {
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
        {this.renderSamples()}
      </div>
    );
  }
}

export default ObjectComponent;
