import React from 'react';
import Radium from 'radium';
import merge from 'lodash/merge';

import Sample from '../Sample/Sample';
import Row from '../Row/Row';
import Column from '../Column/Column';

import {
  hasSamples,
} from '../../Modules/ElementUtils/ElementUtils';

@Radium
class ArrayItemSamples extends React.Component {
  static propTypes = {
    element: React.PropTypes.object,
    style: React.PropTypes.object,
    collapseByDefault: React.PropTypes.bool,
  };

  get style() {
    const style = {
      row: {
        marginTop: '2px',
      },
      sample: {
        row: {
          marginTop: '6px',
        },
      },
    };

    return merge(style, this.props.style || {});
  }

  render() {
    if (!this.props.element) {
      return false;
    }

    if (!hasSamples(this.props.element)) {
      return false;
    }

    const samples = this.props.element.attributes.samples;

    return (
      <Row style={this.style.row}>
        <Column>
          {
            samples.map((sample, index) =>
              <Sample
                sample={sample}
                key={index}
                style={this.style.sample}
                collapseByDefault={this.props.collapseByDefault}
              />
            )
          }
        </Column>
      </Row>
    );
  }
}

export default ArrayItemSamples;
