import React from 'react';
import Radium from 'radium';
import merge from 'lodash/merge';

import Sample from '../Sample/Sample';
import Row from '../Row/Row';
import Column from '../Column/Column';

@Radium
class ArrayItemSamples extends React.Component {
  static propTypes = {
    element: React.PropTypes.object,
  };

  get style() {
    const style = {
      row: {
        marginTop: '2px',
      },
    };

    return merge(style, this.props.style || {});
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

    if (!this.props.element.attributes) {
      return false;
    }

    const samples = this.props.element.attributes.samples;

    if (!samples) {
      return false;
    }

    return (
      <Row style={this.style.row}>
        <Column>
          {
            this.renderSamples(samples)
          }
        </Column>
      </Row>
    );
  }
}

export default ArrayItemSamples;
