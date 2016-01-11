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

import { getType, isNestedObject, isObject } from 'elements/element';

class EnumMember extends React.Component {
  static propTypes = {
    element: React.PropTypes.object,
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
    return classNames('attributeEnumMember',
      getExpandCollapseClassNames(this.props.element, this.state));
  }

  handleExpandCollapseEvent = () => {
    this.setState({
      isExpanded: !this.state.isExpanded,
    });
  }

  renderType() {
    const type = getType(this.props.element);

    if (type) {
      return (
        <div className="attributeEnumMemberType">
          <Type type={type} />
        </div>
      );
    }

    return false;
  }

  renderSamples() {
    const value = this.props.element.content;

    if (!value) {
      return false;
    }

    if (isNestedObject(value.element)) {
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
      <div className="attributeEnumMemberSamplesRow">
        <Samples element={samples} />
      </div>
    );
  }

  renderDefaults() {
    const value = this.props.element.content;

    if (!value) {
      return false;
    }

    if (isObject(value.element)) {
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
      <div className="attributeEnumMemberDefaultsContainer">
        <Defaults element={defaults} />
      </div>
    );
  }

  renderValue() {
    const value = getValue(this.props.element);

    if (value) {
      return (
        <div className="attributeEnumMemberValue">
          {value}
        </div>
      );
    }

    return false;
  }

  render() {
    if (getType(this.props.element) === 'select') {
      return (<noscript/>);
    }

    return (
      <div className={this.getClassNames()}>

        <div className="attributeEnumMemberToggle">
          <Toggle
            expandCollapseEventHandler={this.handleExpandCollapseEvent}
            isExpanded={this.state.isExpanded}
          />
        </div>

        <div className="attributeEnumMemberKey">
          <Key element={this.props.element} />
          {this.renderType()}
        </div>

        <div className="attributeEnumMemberRequirement">
          <Requirement element={this.props.element} />
        </div>

        <div className="attributeEnumMemberDescription">
          <Description element={this.props.element} />
        </div>

        <div className="attributeEnumMemberValueRow">
          {this.renderValue()}
          {this.renderDefaults()}
        </div>

        {this.renderSamples()}

      </div>
    );
  }
}

export default EnumMember;
