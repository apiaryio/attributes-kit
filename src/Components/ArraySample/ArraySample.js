import React from 'react';
import Radium from 'radium';
import merge from 'lodash/merge';

import Row from '../Row/Row';
import Column from '../Column/Column';
import { Value } from '../Value/Value';
import SampleToggle from '../SampleToggle/SampleToggle';

@Radium
class ArraySample extends React.Component {
  static propTypes = {
    element: React.PropTypes.object,
    sample: React.PropTypes.object,
    style: React.PropTypes.object,
    collapseByDefault: React.PropTypes.bool,
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
        background: '#F8F8F9',
        borderLeft: `1px solid ${BORDER_COLOR}`,
        borderRight: `1px solid ${BORDER_COLOR}`,
        paddingTop: '8px',
        paddingBottom: '8px',
        paddingLeft: '8px',
        paddingRight: '8px',
      },
    };

    if (!this.state.isExpanded) {
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
              <Row>
                <Value
                  element={this.props.sample}
                  collapseByDefault={this.props.collapseByDefault}
                />
              </Row>
          }
        </Column>
      </Row>
    );
  }
}

export { ArraySample };
