import React from 'react';

import ArrayHeader from 'ArrayHeader/ArrayHeader';
import Column from 'Column/Column';
import Row from 'Row/Row';
import SampleArrayItem from 'SampleArrayItem/SampleArrayItem';


class SampleArray extends React.Component {
  static propTypes = {
    samples: React.PropTypes.array,
    element: React.PropTypes.object,
    showArrayHeader: React.PropTypes.boolean,
  }

  getSamples() {
    return (this.props.samples || this.props.element.content);
  }

  renderStyles() {
    const styles = {
      sampleArrayItems: {
        border: '1px solid #E8EBEE',
      },
    };

    return styles;
  }

  renderArrayHeader() {
    if (this.props.showArrayHeader === false) {
      return false;
    }

    return (
      <ArrayHeader isExpanded="true" />
    );
  }

  render() {
    const samples = this.getSamples();

    if (!samples) {
      return false;
    }

    const styles = this.renderStyles();

    return (
      <Row>
        <Column>
          {this.renderArrayHeader()}

          <div style={styles.sampleArrayItems}>
            {
              samples.map((sample, index) => {
                return (
                  <SampleArrayItem
                    parentElement={this.props.element}
                    samples={samples}
                    sample={sample}
                    index={index}
                    key={index}
                  />
                );
              })
            }
          </div>
        </Column>
      </Row>
    );
  }
}

export default SampleArray;
