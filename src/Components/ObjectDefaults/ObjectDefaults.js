import React from 'react';
import Radium from 'radium';
import merge from 'lodash/merge';

import Column from '../Column/Column';
import Row from '../Row/Row';
import SampleToggle from '../SampleToggle/SampleToggle';
import { Value } from '../Value/Value';

import {
  hasDefault,
  isObject,
} from '../../Modules/ElementUtils/ElementUtils';

@Radium
class ObjectDefaults extends React.Component {
  static propTypes = {
    element: React.PropTypes.object,
    parentElement: React.PropTypes.object,
    style: React.PropTypes.object,
    collapseByDefault: React.PropTypes.bool,
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
        borderTop: `1px solid ${BORDER_COLOR}`,
        borderLeft: `1px solid ${BORDER_COLOR}`,
        borderRight: `1px solid ${BORDER_COLOR}`,
        borderBottom: `1px solid ${BORDER_COLOR}`,
      },
      header: {
        borderBottom: 'none',
        background: '#F8F8F9',
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

    if (this.props.parentElement && isObject(this.props.parentElement)) {
      style.root.borderLeft = 'none';
    }

    if (this.state.isExpanded) {
      style.header.borderBottom = `1px solid ${BORDER_COLOR}`;
    }

    return merge(style, this.props.style || {});
  }

  render() {
    if (!this.props.element) {
      return false;
    }

    if (!hasDefault(this.props.element)) {
      return false;
    }

    const defaultValue = this.props.element.attributes.default;

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

          {
            this.state.isExpanded &&
              <Row style={style.valueContainer}>
                <Value
                  element={defaultValue}
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

export default ObjectDefaults;
