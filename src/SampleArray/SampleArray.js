import React from 'react';

import SampleArrayItem from 'SampleArrayItem/SampleArrayItem'

import Row from 'Row/Row'
import Column from 'Column/Column'
import ArrayHeader from 'ArrayHeader/ArrayHeader'

class SampleArray extends React.Component {
  static propTypes = {

  }

  renderStyles() {
    let styles = {
      root: {
      },
      sampleArrayItems: {
        border: '1px solid #E8EBEE',
      }
    };

    return styles;
  }

  getSamples() {
    return (this.props.samples || this.props.element.content);
  }

  renderArrayHeader() {
    if (this.props.showArrayHeader === false) {
      return false;
    }

    return (
      <ArrayHeader isExpanded={true} />
    );
  }

  render() {
    const samples = this.getSamples();

    if (!samples) {
      return false;
    }

    const styles = this.renderStyles();

    return (
      <Row style={styles.root}>
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
