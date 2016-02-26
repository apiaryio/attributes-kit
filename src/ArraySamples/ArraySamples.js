import React from 'react';

import ArraySample from '../ArraySample/ArraySample';


class ArraySamples extends React.Component {
  static propTypes = {
    element: React.PropTypes.object,
  };

  renderStyles() {
    const styles = {
      root: {
        width: '100%',
      },
    };

    return styles;
  }

  render() {
    const styles = this.renderStyles();

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
      <div style={styles.root}>
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
