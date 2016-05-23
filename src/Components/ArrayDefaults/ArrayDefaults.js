import React from 'react';
import Radium from 'radium';
import merge from 'lodash/merge';

import Column from '../Column/Column';
import Row from '../Row/Row';
import Sample from '../Sample/Sample';
import SampleToggle from '../SampleToggle/SampleToggle';

@Radium
class ArrayDefaults extends React.Component {
  static propTypes = {
    element: React.PropTypes.object,
  };

  static contextTypes = {
    theme: React.PropTypes.object,
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

  renderDefaults(defaults) {
    if (!this.state.isExpanded) {
      return false;
    }

    return (
      <Row>
        <Sample
          element={this.props.element}
          samples={defaults}
          showArrayHeader={false}
        />
      </Row>
    );
  }

  render() {
    if (!this.props.element) {
      return false;
    }

    const attributes = this.props.element.attributes;

    if (!attributes) {
      return false;
    }

    const defaults = attributes.default;

    if (!defaults) {
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
            this.renderDefaults(defaults)
          }
        </Column>
      </Row>
    );
  }
}

export default ArrayDefaults;
