import React from 'react';
import Radium from 'radium';
import merge from 'lodash/merge';

import Sample from '../Sample/Sample';
import Row from '../Row/Row';
import Column from '../Column/Column';

import {
  hasDefault,
} from '../../Modules/ElementUtils/ElementUtils';

@Radium
class ArrayItemDefaults extends React.Component {
  static propTypes = {
    element: React.PropTypes.object,
    style: React.PropTypes.object,
    collapseByDefault: React.PropTypes.bool,
  };

  get style() {
    const style = {
      sample: {
        row: {
          marginTop: '6px',
        },
      },
    };

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

    return (
      <Row>
        <Column>
          <Sample
            title="Default"
            sample={defaultValue}
            style={this.style.sample}
            collapseByDefault={this.props.collapseByDefault}
          />
        </Column>
      </Row>
    );
  }
}

export default ArrayItemDefaults;
