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

import {getType, isNestedObject, isObject} from 'elements/element';

class EnumMember extends React.Component {
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
    return classNames('attributeEnumMember', getExpandCollapseClassNames(this.props.data, this.state));
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
        <div className="attributeEnumMemberType">
          <Type type={type} />
        </div>
      );
    }

    return false;
  }

  renderSamples() {
    const value = this.props.data.content;

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
        <Samples data={samples} />
      </div>
    );
  }

  renderDefaults() {
    const value = this.props.data.content;

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
        <Defaults data={defaults} />
      </div>
    );
  }

  renderValue() {
    const value = getValue(this.props.data);

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
    if (getType(this.props.data) === 'select') {
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
          <Key data={this.props.data} />
          {this.renderType()}
        </div>

        <div className="attributeEnumMemberRequirement">
          <Requirement data={this.props.data} />
        </div>

        <div className="attributeEnumMemberDescription">
          <Description data={this.props.data} />
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
