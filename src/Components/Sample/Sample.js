import React from 'react';
import merge from 'lodash/merge';

import Column from '../Column/Column';
import Row from '../Row/Row';

import SampleToggle from '../SampleToggle/SampleToggle';
import { PrimitiveValue } from '../PrimitiveValue/PrimitiveValue';

class Sample extends React.Component {
  static propTypes = {
    style: React.PropTypes.object,
    element: React.PropTypes.object,
    showArrayHeader: React.PropTypes.bool,
    showObjectHeader: React.PropTypes.bool,
    showRuler: React.PropTypes.bool,
    parentElement: React.PropTypes.object,
    expandableCollapsible: React.PropTypes.bool,
    sample: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
    ]),
    samples: React.PropTypes.array,
    title: React.PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      isExpanded: false,
    };
  }

  handleExpandCollapse = () => {
    this.setState({
      isExpanded: !this.state.isExpanded,
    });
  };

  renderStyles() {
    const styles = {
      row: {
        width: '100%',
      },
      value: {
        marginTop: '4px',
        marginBottom: '4px',
      },
    };

    return merge(styles, this.props.style || {});
  }

  renderSample(sample, styles) {
    // What if structured?

    if (this.state.isExpanded) {
      return (
        <Column>
          <SampleToggle
            sampleTitle={this.props.title || 'Sample'}
            onClick={this.handleExpandCollapse}
            isExpanded={this.state.isExpanded}
          />

          <PrimitiveValue value={sample} style={styles.value} />
        </Column>
      );
    }

    return (
      <Column>
        <SampleToggle
          sampleTitle={this.props.title || 'Sample'}
          onClick={this.handleExpandCollapse}
        />
      </Column>
    );
  }

  render() {
    const styles = this.renderStyles();

    return (
      <Row style={styles.row}>
        {
        this.renderSample(this.props.sample, styles)
        }
      </Row>
    );
  }
}

export default Sample;
