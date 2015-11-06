import React from 'react';

import EnumMember from 'EnumMember/EnumMember';
import Samples from 'Samples/Samples';
import Defaults from 'Defaults/Defaults';

class EnumComponent extends React.Component {
  static propTypes = {
    data: React.PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.props.data.content = this.props.data.content || [];
  }

  renderSamples() {
    const attributes = this.props.data.attributes;
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
                <EnumMember data={member} />
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

export default EnumComponent;
