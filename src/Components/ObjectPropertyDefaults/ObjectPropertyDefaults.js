import React from 'react';
import Column from '../Column/Column';
import Sample from '../Sample/Sample';

import {
  isObject,
  isArray,
  isEnum,
} from '../../Modules/ElementUtils/ElementUtils';

class ObjectPropertySamples extends React.Component {
  static propTypes = {
    element: React.PropTypes.object,
  };

  get style() {
    return {
      sample: {
        row: {
          marginTop: '6px',
        },
      },
    };
  }

  render() {
    if (!this.props.element) {
      return false;
    }

    if (!this.props.element.content) {
      return false;
    }

    const value = this.props.element.content.value;

    if (!value || !value.attributes || !value.attributes.default) {
      return false;
    }

    if (isObject(value.element) || isArray(value.element) || isEnum(value.element)) {
      return false;
    }

    return (
      <Column>
        <Sample
          sample={value.attributes.default}
          style={this.style.sample}
          title="Default"
        />
      </Column>
    );
  }
}

export default ObjectPropertySamples;
