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
    this.attributes = this.props.data.attributes || {};
  }

  renderDefaults() {
    let defaults = null;

    if (this.attributes) {
      defaults = this.attributes.default;
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

  renderSamplesDropdown() {
    if (this.attributes.samples) {
      return (
        <select>
          {this.attributes.samples[0].map((sample, index) => {
              const sampleName = sample.content.key.content;
            return (<option value={sampleName} key={sampleName}>{sampleName}</option>);
          })}
        </select>
      );
    }
  }

  render() {
    return (
      <div className="attributeObject">
      {this.renderSamplesDropdown()}
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
