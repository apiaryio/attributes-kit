import React from 'react';

import SimplePrimitiveValue from 'SimplePrimitiveValue/SimplePrimitiveValue';
import SimpleMemberValue from 'SimpleMemberValue/SimpleMemberValue';
import SimpleObjectValue from 'SimpleObjectValue/SimpleObjectValue';
import SimpleArrayValue from 'SimpleArrayValue/SimpleArrayValue';

import {isMember, isArray, isObject} from 'elements/element';

class SimpleValue extends React.Component {

  static propTypes = {
    data: React.PropTypes.node,
  }

  renderEntry() {
    const data = this.props.data;
    if (typeof data === 'object') {
      if (!data.element) {
        return false;
      }

      if (isMember(data.element)) {
        return (
          <SimpleMemberValue data={data} />
        );
      }

      if (isObject(data.element)) {
        return (
          <SimpleObjectValue data={data} />
        );
      }

      if (isArray(data.element)) {
        return (
          <SimpleArrayValue data={data} />
        );
      }
    }

    return (
      <SimplePrimitiveValue data={data} />
    );
  }

  render() {
    return (
      <div className="attributeSimpleValue">
        {this.renderEntry()}
      </div>
    );
  }
}

export default SimpleValue;
