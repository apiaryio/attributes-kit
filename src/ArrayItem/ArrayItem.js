import React from 'react';


import Key from 'Key/Key';
import Description from 'Description/Description';
import Toggle from 'Toggle/Toggle';

import {
  getExpandCollapseClassNames,
  getValue
} from 'elements/expandableCollapsibleElement';

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
    return classnames('attributeArrayItem', getExpandCollapseClassNames(this.props.data, this.state));
  }

  handleExpandCollapseEvent = () => {
    this.setState({
      isExpanded: !this.state.isExpanded,
    });
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
