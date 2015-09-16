import React from 'react';

import SamplePrimitiveValue from 'SamplePrimitiveValue/SamplePrimitiveValue';
import SampleMemberValue from 'SampleMemberValue/SampleMemberValue';
import SampleObjectValue from 'SampleObjectValue/SampleObjectValue';
import SampleArrayValue from 'SampleArrayValue/SampleArrayValue';

import {isMember, isArray, isObject} from 'elements/element';

class SampleEntry extends React.Component {

  renderEntry() {
    let data = this.props.data;
    if (typeof data === 'object') {
      if (!data.element) {
        return false;
      }

      if (isMember(data.element)) {
        return (
          <SampleMemberValue data={data} />
        );
      }

      if (isObject(data.element)) {
        return (
          <SampleObjectValue data={data} />
        );
      }

      if (isArray(data.element)) {
        return (
          <SampleArrayValue data={data} />
        );
      }
    }

    return (
      <SamplePrimitiveValue data={data} />
    );
  }

  render() {
    return (
      <div className="attributeSampleEntry">
        {this.renderEntry()}
      </div>
    );
  }
}

export default SampleEntry;
