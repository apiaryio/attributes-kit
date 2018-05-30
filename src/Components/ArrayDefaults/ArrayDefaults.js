import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import merge from 'lodash/merge';

import Column from '../Column/Column';
import Row from '../Row/Row';
import { Value } from '../Value/Value';
import SampleToggle from '../SampleToggle/SampleToggle';

@Radium
class ArrayDefaults extends React.Component {
  static propTypes = {
    element: PropTypes.object,
    style: PropTypes.object,
    collapseByDefault: PropTypes.bool,
  };

  static contextTypes = {
    theme: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      isExpanded: true,
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
    if (!this.props.element) {
      return false;
    }

    if (!this.props.element.cache.hasDefault) {
      return false;
    }

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
              sampleTitle="Default"
            />
          </Row>

          {
            this.state.isExpanded &&
              <Value
                element={this.props.element.attributes.default}
                collapseByDefault={this.props.collapseByDefault}
              />
          }
        </Column>
      </Row>
    );
  }
}

export { ArrayDefaults };
