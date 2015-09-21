import React from 'react';
import classNames from 'classnames';


import Key from 'Key/Key';
import Description from 'Description/Description';
import Toggle from 'Toggle/Toggle';
import Type from 'Type/Type';

import {
  getExpandCollapseClassNames,
  getValue,
} from 'elements/expandableCollapsibleElement';

import {getType} from 'elements/element';

import './arrayItem.styl';


class ArrayItem extends React.Component {
  static propTypes = {
    index: React.PropTypes.number,
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
    return classNames('attributeArrayItem', getExpandCollapseClassNames(this.props.data, this.state));
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
        <div className="attributeArrayItemType">
          <Type type={type} />
        </div>
      );
    }

    return false;
  }

  renderValue() {
    const value = getValue(this.props.data);

    if (value) {
      return (
        <div className="attributeArrayItemValue">
          {value}
        </div>
      );
    }

    return false;
  }

  render() {
    return (
      <div className={this.getClassNames()}>
        <div className="attributeArrayItemRow">
          <div className="attributeArrayItemToggle">
            <Toggle
              expandCollapseEventHandler={this.handleExpandCollapseEvent}
              isExpanded={this.state.isExpanded}
            />
          </div>

          <div className="attributeArrayItemKey">
            <Key index={this.props.index} />
          </div>

          {this.renderType()}

          {this.renderValue()}
        </div>

        <div className="attributeArrayItemRow">
          <div className="attributeArrayItemDescription">
            <Description data={this.props.data} />
          </div>
        </div>

      </div>
    );
  }
}

export default ArrayItem;
