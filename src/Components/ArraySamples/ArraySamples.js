import React from 'react';
import Radium from 'radium';
import merge from 'lodash/merge';

import ArraySample from '../ArraySample/ArraySample';

@Radium
class ArraySamples extends React.Component {
  static propTypes = {
    element: React.PropTypes.object,
  };

  get style() {
    const style = {
      root: {
        width: '100%',
      },
    };

    return merge(style, this.props.style || {});
  }

  render() {
    if (!this.props.element) {
      return false;
    }

    const attributes = this.props.element.attributes;

    if (!attributes) {
      return false;
    }

    const samples = attributes.samples;

    if (!samples) {
      return false;
    }

    return (
      <div style={this.style.root}>
        {
          samples.map((sample, index) =>
            <ArraySample
              element={this.props.element}
              samples={sample}
              key={index}
            />
          )
        }
      </div>
    );
  }
}

export default ArraySamples;
