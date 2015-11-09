import React from 'react';

import Row from 'Row/Row'
import Column from 'Column/Column'
import ObjectSample from 'ObjectSample/ObjectSample'

class ObjectSamples extends React.Component {
  static propTypes = {

  }

  constructor(props) {
    super(props);
  }

  renderStyles() {
    let styles = {
      root: {}
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
      <Row style={styles.root}>
        <Column>
          {
            samples.map((sample, index) => {
              return (
                <ObjectSample
                  element={this.props.element}
                  samples={sample}
                  key={index}
                />
              );
            })
          }
        </Column>
      </Row>
    );
  }
}

export default ObjectSamples;
