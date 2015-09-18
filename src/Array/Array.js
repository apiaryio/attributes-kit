import React from 'react';

import ArrayItemComponent from 'ArrayItem/ArrayItem';
import Samples from 'Samples/Samples';

import './array.styl';

class ArrayComponent extends React.Component {
  static propTypes = {
    data: React.PropTypes.object,
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
      <div className="attributeArraySamplesContainer">
        <Samples data={samples} />
      </div>
    );
  }

  render() {
    return (
      <div className="attributeArray">
        <ul className="attributeArrayItems">
          {this.props.data.content.map((member, index) => {
            return (
              <li key={index} className="attributeArrayItemContainer">
                <ArrayItemComponent index={index} data={member} />
              </li>
            );
          })}
        </ul>

        {this.renderSamples()}
      </div>
    );
  }
}

export default ArrayComponent;
