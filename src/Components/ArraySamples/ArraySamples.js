import React from 'react';
import Radium from 'radium';
import merge from 'lodash/merge';

import { ArraySample } from '../ArraySample/ArraySample';

@Radium
class ArraySamples extends React.Component {
  static propTypes = {
    element: React.PropTypes.object,
    style: React.PropTypes.object,
  };

  get style() {
    const style = {
      base: {
        width: '100%',
      },
    };

    return merge(style, this.props.style || {});
  }

  render() {
    if (!this.props.element) {
      return false;
    }

    if (!this.props.element.cache.hasSamples) {
      return false;
    }

    return (
      <div style={this.style.base}>
        {
          samples.map((sample, index) =>
            <ArraySample
              element={this.props.element}
              sample={sample}
              key={index}
            />
          )
        }
      </div>
    );
  }
}

export { ArraySamples };
