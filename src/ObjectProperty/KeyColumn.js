import Radium from 'radium';
import React from 'react';
import reactDom from 'react-dom';
import merge from 'lodash/merge';

import Column from '../Column/Column';
import Key from '../Key/Key';
import Requirement from '../Requirement/Requirement';

import {
  containsExpandableCollapsibleElement,
} from '../elements/expandableCollapsibleElement';

@Radium
class KeyColumn extends React.Component {
  static propTypes = {
    element: React.PropTypes.object,
    onClick: React.PropTypes.func,
  };

  static contextTypes = {
    eventEmitter: React.PropTypes.object,
  };

  componentDidMount = () => {
    // After the component has been mounted, we can align the keys (the component
    // is in the DOM, it's possible to get the `clientWidth`).
    this.alignKey();

    // Everytime the `alignKeys` event is emitted, we'll re-align the keys.
    this.subscription = this.context.eventEmitter.addListener(
      `${this.props.parentElement.meta.id}:alignKey`,
      this.alignKey
    );
  };

  componentWillUnmount = () => {
    this.subscription.remove();
  };

  alignKey = () => {
    const keyIdentifier = this.props.element.meta.id;
    const keyDomNode = reactDom.findDOMNode(this.refs.key);

    this.props.reportKeyWidth(keyIdentifier, keyDomNode.clientWidth);
  };

  get style() {
    const style = {
      base: {
        marginRight: '20px',
        height: 'auto',
      },
    };

    let isPropertyReferenced = false;

    let keyWidth;

    if (isPropertyReferenced && this.props.keyWidth) {
      keyWidth = `${this.props.keyWidth + 20}px`;
    } else if (this.props.keyWidth) {
      keyWidth = `${this.props.keyWidth}px`;
    }

    if (keyWidth) {
      style.base.width = keyWidth;
      style.base.minWidth = keyWidth;
      style.base.maxWidth = keyWidth;
    } else {
      style.base.width = 'auto';
      style.base.minWidth = null;
      style.base.maxWidth = null;
    }

    if (
      this.props.parentElement &&
        containsExpandableCollapsibleElement(this.props.parentElement.content)
    ) {
      if (this.props.element.meta && (this.props.element.meta._nestedLevel === 0)) {
        style.base.marginLeft = '20px';
      } else {
        style.base.marginLeft = '29px';
      }
    }

    return merge(style, this.props.style || {});
  };

  render() {
    return (
      <Column style={this.style.base}>
        <Key
          onClick={this.props.onClick}
          element={this.props.element}
          ref="key"
        />

        <Requirement
          element={this.props.element}
        />
      </Column>
    );
  };
};

export {KeyColumn};
