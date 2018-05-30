import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import merge from 'lodash/merge';

import { ArraySample } from '../ArraySample/ArraySample';

@Radium
class ArraySamples extends React.Component {
  static propTypes = {
    element: PropTypes.object,
    style: PropTypes.object,
    collapseByDefault: PropTypes.bool,
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

    const samples = this.props.element.attributes.samples;

    return (
      <div style={this.style.base}>
        {
          samples.map((sample, index) =>
            <ArraySample
              element={this.props.element}
              sample={sample}
              key={index}
              collapseByDefault={this.props.collapseByDefault}
            />
          )
        }
      </div>
    );
  }
}

export { ArraySamples };
