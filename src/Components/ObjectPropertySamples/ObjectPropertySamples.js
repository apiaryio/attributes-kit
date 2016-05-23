import React from 'react';

import Column from '../Column/Column';
import Row from '../Row/Row';
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

  renderStyles() {
    return {
      row: {
        marginTop: '2px',
      },
    };
  }

  renderSamples(samples) {
    const style = {
      row: {
        marginTop: '6px',
      },
    };

    return samples.map((sample, index) =>
      <Sample sample={sample} key={index} style={style} />
    );
  }

  render() {
    if (!this.props.element) {
      return false;
    }

    if (!this.props.element.content) {
      return false;
    }

    const value = this.props.element.content.value;

    if (!value) {
      return false;
    }

    if (isObject(value.element) || isArray(value.element) || isEnum(value.element)) {
      return false;
    }

    let samples = null;

    if (value.attributes) {
      samples = value.attributes.samples;
    }

    if (!samples) {
      return false;
    }

    const styles = this.renderStyles();

    return (
      <Row style={styles.row}>
        <Column>
          {this.renderSamples(samples)}
        </Column>
      </Row>
    );
  }
}

export default ObjectPropertySamples;
