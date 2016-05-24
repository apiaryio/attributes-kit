import React from 'react';
import Radium from 'radium';
import merge from 'lodash/merge';

import Column from '../Column/Column';
import Row from '../Row/Row';
import Sample from '../Sample/Sample';
import SampleToggle from '../SampleToggle/SampleToggle';

@Radium
class ObjectDefaults extends React.Component {
  static propTypes = {
    element: React.PropTypes.object,
    style: React.PropTypes.object,
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
      root: {
        marginTop: '8px',
        border: `1px solid ${BORDER_COLOR}`,
      },
      header: {
        borderBottom: 'none',
        background: '#F8F8F9',
        paddingTop: '8px',
        paddingBottom: '8px',
        paddingLeft: '8px',
        paddingRight: '8px',
      },
    };

    if (this.state.isExpanded) {
      style.header.borderBottom = `1px solid ${BORDER_COLOR}`;
    }

    return merge(style, this.props.style || {});
  }

  renderDefaults() {
    if (!this.props.element) {
      return false;
    }

    const attributes = this.props.element.attributes;

    let defaults = null;

    if (attributes) {
      defaults = attributes.default;
    }

    if (!defaults) {
      return false;
    }

    if (!this.state.isExpanded) {
      return false;
    }

    const element = {
      element: 'object',
      content: defaults,
    };

    return (
      <Row>
        <Sample
          element={element}
          showObjectHeader={false}
        />
      </Row>
    );
  }

  render() {
    if (!this.props.element) {
      return false;
    }

    const attributes = this.props.element.attributes;

    let defaults = null;

    if (attributes) {
      defaults = attributes.default;
    }

    if (!defaults) {
      return false;
    }

    const style = this.style;

    return (
      <Row style={style.root}>
        <Column>
          <Row
            style={style.header}
            onClick={this.handleExpandCollapse}
          >
            <SampleToggle
              isExpanded={this.state.isExpanded}
              onClick={this.handleExpandCollapse}
              sampleTitle="Default"
            />
          </Row>

          {this.renderDefaults()}
        </Column>
      </Row>
    );
  }
}

export default ObjectDefaults;
