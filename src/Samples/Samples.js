import React from 'react';

import Sample from 'Sample/Sample';

import Row from 'Row/Row';
import Column from 'Column/Column';

class Samples extends React.Component {
  static propTypes = {
    samples: React.PropTypes.array,
  };

  render() {
    return (
      <Row>
        Brrr...
        <Column>
          {this.props.samples.map((sample, index) =>
            <Row>
              <Sample key={index} sample={sample} />
            </Row>
          )}
        </Column>
      </Row>
    );
  }
}

export default Samples;
