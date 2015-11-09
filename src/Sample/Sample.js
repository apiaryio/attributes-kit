import React from 'react';
import _ from 'lodash';

import Row from 'Row/Row'
import Column from 'Column/Column'
import SampleArray from 'SampleArray/SampleArray';
import SampleObject from 'SampleObject/SampleObject';
import Value from 'Value/Value';

import SampleToggle from 'SampleToggle/SampleToggle';

import {isMember, isArray, isObject} from 'elements/element';


class Sample extends React.Component {
  static propTypes = {
    data: React.PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.state = {
      isExpanded: false,
    };
  }

  handleExpandCollapse = () => {
    console.log('aaa')
    this.setState({
      isExpanded: !this.state.isExpanded,
    });
  }

  renderStyles() {
    let styles = {
      row: {

      },
      value: {
        marginTop: '4px',
        marginBottom: '4px',
      }
    };

    return _.merge(styles, this.props.style || {});
  }

  renderSample(sample, styles) {
    if (this.state.isExpanded) {
      return (
        <Column>
          <SampleToggle
            sampleTitle="Sample"
            onClick={this.handleExpandCollapse}
            isExpanded={this.state.isExpanded}
          />
          <Value value={sample} style={styles.value} />
        </Column>
      );
    }

    return (
      <Column>
        <SampleToggle
          sampleTitle="Sample"
          onClick={this.handleExpandCollapse}
        />
      </Column>
    );
  }

  render() {
    if (isArray(this.props.element)) {
      return (
        <SampleArray
          element={this.props.element}
          samples={this.props.samples}
          showArrayHeader={this.props.showArrayHeader}
        />
      );
    }

    if (isObject(this.props.element)) {
      return (
        <SampleObject
          parentElement={this.props.parentElement}
          element={this.props.element}
          samples={this.props.samples}
          expandableCollapsible={this.props.expandableCollapsible}
          showObjectHeader={this.props.showObjectHeader}
          showRuler={this.props.showRuler}
        />
      );
    }

    const sample = this.props.data || this.props.sample;

    const styles = this.renderStyles();

    return (
      <Row style={styles.row}>
        {this.renderSample(sample, styles)}
      </Row>
    );
  }
}

export default Sample;
