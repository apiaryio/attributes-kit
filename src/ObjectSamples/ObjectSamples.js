import React from 'react';

import Column from 'Column/Column';
import ObjectSample from 'ObjectSample/ObjectSample';
import Row from 'Row/Row';


class ObjectSamples extends React.Component {
  static propTypes = {
    element: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  renderStyles() {
    const styles = {};

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
            samples.map((sample, index) =>
              <ObjectSample
                element={this.props.element}
                samples={sample}
                key={index}
              />
            )
          }
        </Column>
      </Row>
    );
  }
}

export default ObjectSamples;
