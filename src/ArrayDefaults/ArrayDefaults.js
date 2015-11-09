import React from 'react';

import Column from 'Column/Column';
import Row from 'Row/Row';
import Sample from 'Sample/Sample';
import SampleToggle from 'SampleToggle/SampleToggle';

class ArrayDefaults extends React.Component {
  static propTypes = {

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
    let styles = {
      header: {
        background: '#F8F8F9',
        borderLeft: '1px solid #E8EBEE',
        borderRight: '1px solid #E8EBEE',
        paddingTop: '8px',
        paddingBottom: '8px',
        paddingLeft: '8px',
        paddingRight: '8px',
      }
    };

    if (!this.state.isExpanded) {
      styles.header.borderBottom = '1px solid #E8EBEE';
    };

    return styles;
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
    const styles = this.renderStyles();

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
            style={styles.header}
            onClick={this.handleExpandCollapse}
          >
            <SampleToggle
              isExpanded={this.state.isExpanded}
              onClick={this.handleExpandCollapse}
              sampleTitle="Default"
            />
          </Row>

          {this.renderDefaults(defaults)}
        </Column>
      </Row>
    );
  }
}

export default ArrayDefaults;
