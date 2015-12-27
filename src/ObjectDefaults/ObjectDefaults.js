import React from 'react';

import Column from 'Column/Column';
import Row from 'Row/Row';
import Sample from 'Sample/Sample';
import SampleToggle from 'SampleToggle/SampleToggle';

class ObjectDefaults extends React.Component {
  static propTypes = {
    element: React.PropTypes.object,
  }

  static contextTypes = {
    theme: React.PropTypes.object,
  }

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
  }

  renderStyles() {
    const { BORDER_COLOR } = this.context.theme;

    const styles = {
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
      styles.header.borderBottom = `1px solid ${BORDER_COLOR}`;
    }

    return styles;
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

    const styles = this.renderStyles();

    return (
      <Row style={styles.root}>
        <Column>
          <Row
            style={styles.header}
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
