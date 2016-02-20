import React from 'react';

import Sample from 'Sample/Sample';
import Row from 'Row/Row';
import Column from 'Column/Column';


class ArrayItemSamples extends React.Component {
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

    if (!this.props.element.attributes) {
      return false;
    }

    const samples = this.props.element.attributes.samples;

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

export default ArrayItemSamples;
