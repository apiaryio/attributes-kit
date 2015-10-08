import React from 'react';
import classNames from 'classnames';

import ArrayItemComponent from 'ArrayItem/ArrayItem';
import Samples from 'Samples/Samples';
import Defaults from 'Defaults/Defaults';

import {
  containsExpandableCollapsibleElement,
} from 'elements/expandableCollapsibleElement';

import './array.styl';

class ArrayComponent extends React.Component {
  static propTypes = {
    content: React.PropTypes.array,
    attributes: React.PropTypes.object,
  }

  getClassNames() {
    return classNames(
      'attributeArray',
      {'containsExpandableCollapsibleElements': containsExpandableCollapsibleElement(this.props.content)}
    );
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
      <div className="attributeArraySamplesContainer">
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
      <div className="attributeArrayDefaultsContainer">
        <Defaults data={defaults} />
      </div>
    );
  }

  render() {
    if (!this.props.content) {
      return false;
    }

    return (
      <div className={this.getClassNames()}>
        <ul className="attributeArrayItems">
          {this.props.content.map((member, index) => {
            return (
              <li key={index} className="attributeArrayItemContainer">
                <ArrayItemComponent index={index} data={member} />
              </li>
            );
          })}
        </ul>

        {this.renderDefaults()}

        {this.renderSamples()}
      </div>
    );
  }
}

export default ArrayComponent;
