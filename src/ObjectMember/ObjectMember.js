import React from 'react';

import KeyComponent from 'Key/Key';
import RequirementComponent from 'Requirement/Requirement';
import Description from 'Description/Description';
import Toggle from 'Toggle/Toggle';

import {
  isExpandableAndCollapsible,
  getExpandCollapseClassNames,
  getValue
} from 'elements/expandableCollapsibleElement';

import './objectMember.styl';


class ObjectMember extends React.Component {
  constructor(props) {
    super(props);

    // State hasn't been set; tree is expanded by default,
    // after a click, it collapses.
    this.state = {
      isExpanded: true,
    };
  }

  getClassNames() {
    const memberClassNames = ['attributeObjectMemeber'];

    if (isExpandableAndCollapsible(this.props.data)) {
      return getExpandCollapseClassNames(this.props.data, this.state, memberClassNames);
    }

    return memberClassNames;
  }

  handleExpandCollapseEvent() {
    this.setState({
      isExpanded: !this.state.isExpanded,
    });
  }

  renderValue() {
    const value = getValue(this.props.data);

    if (value) {
      return (
        <div className="attributeObjectMemeberValue">
          {value}
        </div>
      );
    }

    return false;
  }

  render() {
    return (
      <div className={this.getClassNames().join(' ')}>

        <div className="attributeObjectMemeberToggle">
          <Toggle
            expandCollapseEventHandler={this.handleExpandCollapseEvent.bind(this)}
            isExpanded={this.state.isExpanded}
          />
        </div>

        <div className="attributeObjectMemeberKey">
          <KeyComponent data={this.props.data} />
        </div>

        <div className="attributeObjectMemeberRequirement">
          <RequirementComponent data={this.props.data} />
        </div>

        <div className="attributeObjectMemeberDescription">
          <Description data={this.props.data} />
        </div>

        {this.renderValue()}

      </div>
    );
  }
}

ObjectMember.propTypes = {
  data: React.PropTypes.object,
};

export default ObjectMember;
