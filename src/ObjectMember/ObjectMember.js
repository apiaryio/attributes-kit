import React from 'react';
import classNames from 'classnames';

import Key from 'Key/Key';
import Requirement from 'Requirement/Requirement';
import Description from 'Description/Description';
import Toggle from 'Toggle/Toggle';
import Type from 'Type/Type';
import Samples from 'Samples/Samples';
import Defaults from 'Defaults/Defaults';

import {
  getExpandCollapseClassNames,
  getValue,
} from 'elements/expandableCollapsibleElement';

import {getType, isObjectOrArray} from 'elements/element';

import './objectMember.styl';


class ObjectMember extends React.Component {
  static propTypes = {
    data: React.PropTypes.object,
  }

  constructor(props) {
    super(props);

    // State hasn't been set; tree is expanded by default,
    // after a click, it collapses.
    this.state = {
      isExpanded: true,
    };
  }

  getClassNames() {
    return classNames('attributeObjectMember', getExpandCollapseClassNames(this.props.data, this.state));
  }

  handleExpandCollapseEvent = () => {
    this.setState({
      isExpanded: !this.state.isExpanded,
    });
  }

  renderType() {
    const type = getType(this.props.data);

    if (type) {
      return (
        <div className="attributeObjectMemberType">
          <Type type={type} />
        </div>
      );
    }

    return false;
  }

  renderSamples() {
    const value = this.props.data.content.value;

    if (isObjectOrArray(value.element)) {
      return false;
    }

    let samples = null;

    if (value.attributes) {
      samples = value.attributes.samples;
    }

    if (!samples) {
      return false;
    }

    return (
      <div className="attributeObjectMemberSamplesContainer">
        <Samples data={samples} />
      </div>
    );
  }

  renderDefaults() {
    const value = this.props.data.content.value;

    if (isObjectOrArray(value.element)) {
      return false;
    }

    let defaults = null;

    if (value.attributes) {
      defaults = value.attributes.default;
    }

    if (!defaults) {
      return false;
    }

    return (
      <div className="attributeObjectMemberDefaultsContainer">
        <Defaults data={defaults} />
      </div>
    );
  }

  renderValue() {
    const value = getValue(this.props.data);

    if (value) {
      return (
        <div className="attributeObjectMemberValue">
          {value}
        </div>
      );
    }

    return false;
  }

  render() {
    return (
      <div className={this.getClassNames()}>

        <div className="attributeObjectMemberToggle">
          <Toggle
            expandCollapseEventHandler={this.handleExpandCollapseEvent}
            isExpanded={this.state.isExpanded}
          />
        </div>

        <div className="attributeObjectMemberKey">
          <Key data={this.props.data} />
        </div>

        <div className="attributeObjectMemberRequirement">
          <Requirement data={this.props.data} />
        </div>

        <div className="attributeObjectMemberDescription">
          <Description data={this.props.data} />
        </div>

        {this.renderType()}

        {this.renderValue()}

        {this.renderDefaults()}

        {this.renderSamples()}

      </div>
    );
  }
}

export default ObjectMember;
