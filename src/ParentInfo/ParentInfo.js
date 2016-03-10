import React from 'react';
import merge from 'lodash/merge';

import Row from '../Row/Row';
import Column from '../Column/Column';


class ParentInfo extends React.Component {
  static propTypes = {
    element: React.PropTypes.object,
    style: React.PropTypes.object,
  };

  static contextTypes = {
    theme: React.PropTypes.object,
    onElementLinkClick: React.PropTypes.func,
  };

  get style() {
    const { BORDER_COLOR } = this.context.theme;

    const style = {
      base: {

      },
    };

    return merge(style, this.props.style || {});
  };

  get ref() {
    return this.props.element.meta && this.props.element.meta.ref;
  }

  render() {
    return (
      <Column style={this.style.base}>
        <Row>
          <Column>
            <span>▸ parent</span>
          </Column>
          <Column>
            <a href="#" onclick={this.context.onElementLinkClick}>{this.ref}</a>
          </Column>
        </Row>
      </Column>
    );
  };
}

export default ParentInfo;
