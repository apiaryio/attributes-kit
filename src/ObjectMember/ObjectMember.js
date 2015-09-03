import React from 'react';

import AttributeComponent from 'Attribute/Attribute';
import KeyComponent from 'Key/Key';
import ValueComponent from 'Value/Value';
import RequirementComponent from 'Requirement/Requirement';

import './objectMember.styl'

class ObjectMemberComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  handleExpandCollapseEvent() {
    // State hasn't been set; tree is expanded by default,
    // after a click, it collapses.
    if (!this.state || typeof this.state.isExpanded === 'undefined') {
      this.setState({
        isExpanded: false
      });

    // Toggle expand/collapse.
    } else {
      this.setState({
        isExpanded: !this.state.isExpanded
      });
    }
  }

  isObjectOrArray(element) {
    return ['object', 'array'].indexOf(element) > -1;
  }

  isExpandableAndCollapsible() {
    var data = this.props.data;

    if (this.isObjectOrArray(data.element)) {
      return true;
    } else if (data.element === 'member') {
      if (this.isObjectOrArray(data.content.value.element)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  renderValue() {
    var data = this.props.data;

    if (this.isObjectOrArray(data.element)) {
      return <AttributeComponent data={data.content} />;
    } else if (data.element === 'member') {
      if (this.isObjectOrArray(data.content.value.element)) {
        return <AttributeComponent data={data.content.value} />;
      } else {
        return <ValueComponent value={data.content.value.content} />;
      }
    } else {
      return <ValueComponent value={data.content} />;
    }
  }

  renderToggle() {
    var classNames = ['attributeObjectMemeberToggleIcon'];

    if (!this.isExpandableAndCollapsible()) {
      classNames.push('isHidden');
    }

    return (
      <div className="attributeObjectMemeberToggle" onClick={this.handleExpandCollapseEvent.bind(this)}>
        <span className={classNames.join(' ')}></span>
      </div>
    );
  }

  render() {
    var memberClassNames = ['attributeObjectMemeber'];

    if (this.isExpandableAndCollapsible()) {
      memberClassNames.push('expandableCollapsible');
    }

    if (this.state && this.state.isExpanded) {
      memberClassNames.push('expanded');
    } else {
      memberClassNames.push('collapsed');
    }

    return (
      <div className={memberClassNames.join(' ')}>

        {this.renderToggle()}

        <div className="attributeObjectMemeberKey">
          <KeyComponent data={this.props.data} />
        </div>

        <div className="attributeObjectMemeberRequirement">
          <RequirementComponent data={this.props.data} />
        </div>

        <div className="attributeObjectMemeberDescription">
        </div>

        <div className="attributeObjectMemeberValue">
          {this.renderValue()}
        </div>

      </div>
    );
  }
}

export default ObjectMemberComponent;
