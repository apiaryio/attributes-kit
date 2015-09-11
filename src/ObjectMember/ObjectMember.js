import React from 'react';

import AttributeComponent from 'Attribute/Attribute';
import KeyComponent from 'Key/Key';
import ValueComponent from 'Value/Value';
import RequirementComponent from 'Requirement/Requirement';
import Description from 'Description/Description';

import TYPES from 'types';

import './objectMember.styl';

class ObjectMemberComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  getValueType({element, content}) {
    if (element === 'member') {
      return content.value.element;
    }

    return element;
  }

  isObject(element) {
    return element === TYPES.OBJECT;
  }

  isArray(element) {
    return element === TYPES.ARRAY;
  }

  isObjectOrArray(element) {
    return (element === TYPES.OBJECT) || (element === TYPES.ARRAY);
  }

  handleExpandCollapseEvent() {
    // State hasn't been set; tree is expanded by default,
    // after a click, it collapses.
    if (!this.state || typeof this.state.isExpanded === 'undefined') {
      this.setState({
        isExpanded: false,
      });

    // Toggle expand/collapse.
    } else {
      this.setState({
        isExpanded: !this.state.isExpanded,
      });
    }
  }


  isExpandableAndCollapsible() {
    const valueType = this.getValueType(this.props.data);

    if (this.isObjectOrArray(valueType)) {
      return true;
    }

    return false;
  }

  addExpandCollapseClassNames(classNames) {
    classNames.push('isExpandableCollapsible');

    const valueType = this.getValueType(this.props.data);

    // Attach a class name indicating a type of the value,
    // e.g. `isObject`, `isArray`.
    classNames.push(`
      is${valueType.charAt(0).toUpperCase() + valueType.substr(1)}
    `);

    if (!this.state) {
      classNames.push('isExpanded');
    } else if (this.state && this.state.isExpanded) {
      classNames.push('isExpanded');
    } else {
      classNames.push('isCollapsed');
    }
  }

  renderValue() {
    const data = this.props.data;
    let valueComponent;

    if (this.isObjectOrArray(data.element)) {
      valueComponent = <AttributeComponent data={data.content} />;
    } else if (data.element === 'member') {
      if (this.isObjectOrArray(data.content.value.element)) {
        valueComponent = <AttributeComponent data={data.content.value} />;
      } else if (data.content.value.content) {
        valueComponent = <ValueComponent value={data.content.value.content} />;
      } else {
        valueComponent = false;
      }
    } else if (data.content) {
      valueComponent = <ValueComponent value={data.content} />;
    } else {
      valueComponent = false;
    }


    if (valueComponent) {
      return (
        <div className="attributeObjectMemeberValue">
          {valueComponent}
        </div>
      );
    }

    return false;
  }

  renderToggle() {
    return (
      <div className="attributeObjectMemeberToggle" onClick={this.handleExpandCollapseEvent.bind(this)}>
        <span className="attributeObjectMemeberToggleIcon"></span>
      </div>
    );
  }

  render() {
    const memberClassNames = ['attributeObjectMemeber'];

    // If the value is an object or an array, the component
    // does support expand/collapse functionality. In order
    // to support such functionality we have to attach
    // respective class names to the `.attributeObjectMemeber`
    // element.
    //
    // `expanded`/`collapsed` to indicate the current state;
    // `isObject`/`isArray` to state the type of the value, as
    // each has a different background color; and so on.
    if (this.isExpandableAndCollapsible()) {
      this.addExpandCollapseClassNames(memberClassNames);
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
          <Description data={this.props.data} />
        </div>

        {this.renderValue()}

      </div>
    );
  }
}

export default ObjectMemberComponent;
