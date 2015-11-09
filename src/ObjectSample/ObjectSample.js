import React from 'react';

import Column from 'Column/Column';
import Row from 'Row/Row';
import Sample from 'Sample/Sample';
import SampleToggle from 'SampleToggle/SampleToggle';

import {BORDER_COLOR} from 'theme';

class ObjectSample extends React.Component {
  static propTypes = {
    element: React.PropTypes.object,
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
      header: {
        borderTop: `1px solid ${BORDER_COLOR}`,
        paddingTop: '8px',
        paddingBottom: '8px',
        paddingLeft: '8px',
        paddingRight: '8px',
      },
    };

    styles.header.borderBottom = `1px solid ${BORDER_COLOR}`;

    return styles;
  }

  renderSample() {
    if (!this.state.isExpanded) {
      return false;
    }

    const element = {
      element: 'object',
      content: this.props.samples,
    };

    return (
      <Row>
        <Sample
          parentElement={this.props.element}
          element={element}
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

export default ObjectSample;
