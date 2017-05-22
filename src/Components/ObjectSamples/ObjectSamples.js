import React from 'react';
import Radium from 'radium';
import merge from 'lodash/merge';

import Column from '../Column/Column';
import ObjectSample from '../ObjectSample/ObjectSample';
import Row from '../Row/Row';

import {
  hasSamples,
} from '../../Modules/ElementUtils/ElementUtils';

@Radium
class ObjectSamples extends React.Component {
  static propTypes = {
    element: React.PropTypes.object,
    style: React.PropTypes.object,
    collapseByDefault: React.PropTypes.bool,
  };

  get style() {
    const style = {};

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
      <Row>
        <Column>
          {
            samples.map((sample, index) =>
              <ObjectSample
                element={this.props.element}
                sample={sample}
                sampleIndex={index}
                samples={samples}
                key={index}
                collapseByDefault={this.props.collapseByDefault}
              />
            )
          }
        </Column>
      </Row>
    );
  }
}

export default ObjectSamples;
