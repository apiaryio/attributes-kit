import merge from 'lodash/merge';
import radium from 'radium';
import React from 'react';

import Row from '../Row/Row';
import Column from '../Column/Column';
import ParentInfoLink from './ParentInfoLink';

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
    const style = {
      base: {
        paddingTop: '6px',
        paddingBottom: '6px',
      },
      text: {
        fontFamily: 'Source Sans Pro',
        fontSize: '14px',
        color: '#4C5264',
        fontStyle: 'italic',
        fontWeight: '600',
        textDecoration: 'none',
      },
    };

    return merge(style, this.props.style || {});
  };

  get ref() {
    return this.props.element.meta && this.props.element.meta.ref;
  }

  render() {
    return (
      <Row style={this.style.base}>
        <Column>
          <span style={this.style.text}>▸&nbsp;parent</span>
        </Column>
        <Column>
          <ParentInfoLink element={this.props.element}/>
        </Column>
      </Row>
    );
  };
}

export default radium(ParentInfo);
