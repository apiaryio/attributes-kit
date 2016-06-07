import React from 'react';
import Radium from 'radium';
import merge from 'lodash/merge';

import { Value } from '../Value/Value';
import Column from '../Column/Column';
import Row from '../Row/Row';
import SampleToggle from '../SampleToggle/SampleToggle';

@Radium
class ObjectSample extends React.Component {
  static propTypes = {
    element: React.PropTypes.object,
    sample: React.PropTypes.object,
    sampleIndex: React.PropTypes.number,
    samples: React.PropTypes.array,
    style: React.PropTypes.object,
  };

  static contextTypes = {
    theme: React.PropTypes.object,
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

  get style() {
    const { BORDER_COLOR } = this.context.theme;

    const style = {
      header: {
        borderTop: `1px solid ${BORDER_COLOR}`,
        paddingTop: '8px',
        paddingBottom: '8px',
        paddingLeft: '8px',
        paddingRight: '8px',
      },
      valueContainer: {
        paddingLeft: '14px',
        paddingRight: '14px',
      },
    };

    const isLastObjectSample = this.props.sampleIndex === (this.props.samples.length - 1);

    if (this.state.isExpanded || isLastObjectSample) {
      style.header.borderBottom = `1px solid ${BORDER_COLOR}`;
    }

    return merge(style, this.props.style || {});
  }

  render() {
    return (
      <Row>
        <Column>
          <Row
            style={this.style.header}
            onClick={this.handleExpandCollapse}
          >
            <SampleToggle
              isExpanded={this.state.isExpanded}
              onClick={this.handleExpandCollapse}
            />
          </Row>

          {
            this.state.isExpanded &&
              <Row style={this.style.valueContainer}>
                <Value element={this.props.sample} isSample />
              </Row>
          }
        </Column>
      </Row>
    );
  }
}

export default ObjectSample;
