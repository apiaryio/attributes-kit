import React from 'react';
import merge from 'lodash/merge';

import Row from '../Row/Row';
import Type from '../Type/Type';
import Column from '../Column/Column';
import { PrimitiveValue } from '../PrimitiveValue/PrimitiveValue';
import Description from '../Description/Description';

import {
  hasDescription,
  hasValue,
} from '../../Modules/ElementUtils/ElementUtils';

class Primitive extends React.Component {
  static propTypes = {
    element: React.PropTypes.object,
    style: React.PropTypes.object,
  };

  static contextTypes = {
    theme: React.PropTypes.object,
  };

  get style() {
    const { BORDER_COLOR } = this.context.theme;

    const style = {
      base: {

      },
      typeHeader: {
        borderBottom: `1px solid ${BORDER_COLOR}`,
        paddingBottom: '8px',
        paddingLeft: '0px',
        paddingTop: '4px',
      },
      type: {
        root: {
          fontSize: '12px',
        },
      },
    };

    return merge(style, this.props.style || {});
  };

  get type() {
    const element = this.props.element;

    if (element.meta && element.meta.id) {
      return element.meta.id;
    }

    return element.element;
  };

  render() {
    return (
      <Column style={this.style.base}>
        <Row style={this.style.typeHeader}>
          <Type
            type={this.type}
            style={this.style.type}
          />
        </Row>

        {
          hasDescription(this.props.element) &&
            <Row>
              <Description element={this.props.element} />
            </Row>
        }

        {
          hasValue(this.props.element) &&
            <Row>
              <Value element={this.props.element} />
            </Row>
        }
      </Column>
    );
  };
}

export default Primitive;
