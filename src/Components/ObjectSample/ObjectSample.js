import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import merge from 'lodash/merge';

import { Value } from '../Value/Value';
import Column from '../Column/Column';
import Row from '../Row/Row';
import SampleToggle from '../SampleToggle/SampleToggle';

@Radium
class ObjectSample extends React.Component {
  static propTypes = {
    element: PropTypes.object,
    sample: PropTypes.object,
    sampleIndex: PropTypes.number,
    samples: PropTypes.array,
    style: PropTypes.object,
    collapseByDefault: PropTypes.bool,
  };

  static contextTypes = {
    theme: PropTypes.object,
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
                <Value
                  element={this.props.sample}
                  isSample
                  collapseByDefault={this.props.collapseByDefault}
                />
              </Row>
          }
        </Column>
      </Row>
    );
  }
}

export default ObjectSample;
