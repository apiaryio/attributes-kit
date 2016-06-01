import Radium from 'radium';
import React from 'react';
import reactDom from 'react-dom';
import merge from 'lodash/merge';
import random from 'lodash/random';
import Column from '../Column/Column';
import Key from '../Key/Key';
import Requirement from '../Requirement/Requirement';

import {
  isStructured,
  containsStructuredElement,
} from '../../Modules/ElementUtils/ElementUtils';

@Radium
class KeyColumn extends React.Component {
  static propTypes = {
    element: React.PropTypes.object,
    keyWidth: React.PropTypes.number,
    onClick: React.PropTypes.func,
    parentElement: React.PropTypes.object,
    reportKeyWidth: React.PropTypes.func,
    style: React.PropTypes.object,
  };

  static contextTypes = {
    eventEmitter: React.PropTypes.object,
  };

  componentDidMount = () => {
    // After the component has been mounted, we can align the keys (the component
    // is in the DOM, it's possible to get the `clientWidth`).
    this.alignKey();

    // Everytime the `alignKeys` event is emitted, we'll re-align the keys.
    if (this.context.eventEmitter) {
      if (this.props.parentElement.meta && this.props.parentElement.meta.id) {
        this.subscription = this.context.eventEmitter.addListener(
          `${this.props.parentElement.meta.id}:alignKey`,
          this.alignKey
        );
      }
    }
  };

  componentWillUnmount = () => {
    if (this.subscription) {
      this.subscription.remove();
    }
  };

  alignKey = () => {
    let keyIdentifier;

    if (this.props.element.meta && this.props.element.meta.id) {
      keyIdentifier = this.props.element.meta.id;
    } else {
      keyIdentifier = random(0, 1000000);
    }

    const keyDomNode = reactDom.findDOMNode(this.refs.key);

    this.props.reportKeyWidth(keyIdentifier, keyDomNode.clientWidth);
  };

  get style() {
    const style = {
      base: {},
    };

    if (isStructured(this.props.element)) {
      style.base.marginLeft = '0px';
    } else {
      if (containsStructuredElement(this.props.parentElement)) {
        if (this.props.element.meta._nestedLevel === 0) {
          style.base.marginLeft = '20px';
        } else {
          style.base.marginLeft = '30px';
        }
      } else {
        style.base.marginLeft = '30px';
      }
    }

    style.base.marginRight = '40px';

    let keyWidth;

    if (this.props.keyWidth) {
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

export {
  KeyColumn,
};
