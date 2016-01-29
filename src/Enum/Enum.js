import React from 'react';

import EnumMember from 'EnumMember/EnumMember';
import Samples from 'Samples/Samples';
import Defaults from 'Defaults/Defaults';

class EnumComponent extends React.Component {
  static propTypes = {
    element: React.PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.props.element.content = this.props.element.content || [];
  }

  renderSamples() {
    const attributes = this.props.element.attributes;
    let samples = null;

    if (attributes) {
      samples = attributes.samples;
    }

    if (!samples) {
      return false;
    }

    return (
      <div className="attributeObjectSamplesContainer">
        <Samples element={samples} />
      </div>
    );
  }

  renderDefaults() {
    const attributes = this.props.element.attributes;
    let defaults = null;

    if (attributes) {
      defaults = attributes.default;
    }

    if (!defaults) {
      return false;
    }

    return (
      <div className="attributeObjectDefaults">
        <Defaults element={defaults} />
      </div>
    );
  }

  render() {
    return (
      <div className="attributeObject">
        <div className="attributeObjectMembers">
          {this.props.element.content.map((member, index) => {
            return (
              <div
                className="attributeObjectMemberContainer"
                key={index}
              >
                <EnumMember element={member} />
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
