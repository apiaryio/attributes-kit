import React from 'react';
import lodash from 'lodash';

import Column from 'Column/Column';
import Row from 'Row/Row';
import SampleArray from 'SampleArray/SampleArray';
import SampleObject from 'SampleObject/SampleObject';
import SampleToggle from 'SampleToggle/SampleToggle';
import Value from 'Value/Value';

import {
  isArray,
  isObject,
} from 'elements/element';


class Sample extends React.Component {
  static propTypes = {
    style: React.PropTypes.object,
    element: React.PropTypes.object,
    showArrayHeader: React.PropTypes.boolen,
    showObjectHeader: React.PropTypes.boolean,
    showRuler: React.PropTypes.boolean,
    parentElement: React.PropTypes.object,
    expandableCollapsible: React.PropTypes.boolean,
    sample: React.PropTypes.object,
    samples: React.PropTypes.array,
  }

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
  }

  renderStyles() {
    const styles = {
      row: {

      },
      value: {
        marginTop: '4px',
        marginBottom: '4px',
      },
    };

    return lodash.merge(styles, this.props.style || {});
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
