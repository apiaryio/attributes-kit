import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import merge from 'lodash/merge';

import { Value } from '../Value/Value';
import Column from '../Column/Column';
import Row from '../Row/Row';
import SampleToggle from '../SampleToggle/SampleToggle';

@Radium
class Sample extends React.Component {
  static propTypes = {
    style: PropTypes.object,
    element: PropTypes.object,
    sample: PropTypes.object,
    title: PropTypes.string,
    collapseByDefault: PropTypes.bool,
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
    const styles = {
      row: {
        width: '100%',
      },
      value: {
        base: {
          marginTop: '4px',
          marginBottom: '4px',
        },
      },
    };

    return merge(styles, this.props.style || {});
  }

  render() {
    return (
      <Row style={this.style.row}>
        <Column>
          <SampleToggle
            sampleTitle={this.props.title || 'Sample'}
            onClick={this.handleExpandCollapse}
            isExpanded={this.state.isExpanded}
          />

          {
            this.state.isExpanded &&
              <Value
                element={this.props.sample}
                style={this.style.value}
                collapseByDefault={this.props.collapseByDefault}
              />
          }
        </Column>
      </Row>
    );
  }
}

export default Sample;
