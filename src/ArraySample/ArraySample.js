import React from 'react';

import Row from 'Row/Row';
import Column from 'Column/Column';
import Sample from 'Sample/Sample';
import SampleToggle from 'SampleToggle/SampleToggle';

class ArraySample extends React.Component {
  static propTypes = {
    element: React.PropTypes.object,
    samples: React.PropTypes.array,
  }

  static contextTypes = {
    theme: React.PropTypes.object,
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
    const {BORDER_COLOR} = this.context.theme;

    const styles = {
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
      styles.header.borderBottom = `1px solid ${BORDER_COLOR}`;
    }

    return styles;
  }

  renderSample() {
    if (!this.state.isExpanded) {
      return false;
    }

    return (
      <Row>
        <Sample
          samples={this.props.samples}
          element={this.props.element}
          showArrayHeader={false}
        />
      </Row>
    );
  }

  render() {
    const styles = this.renderStyles();

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
            />
          </Row>

          {this.renderSample()}
        </Column>
      </Row>
    );
  }
}

export default ArraySample;
