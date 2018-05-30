import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import merge from 'lodash/merge';

import ArrayItemIndex from '../ArrayItemIndex/ArrayItemIndex';
import Column from '../Column/Column';
import Description from '../Description/Description';
import Row from '../Row/Row';
import { Value } from '../Value/Value';

import {
  containsStructuredElement,
  hasDescription,
  isArray,
  isLastArrayItem,
  isObject,
  isStructured,
} from '../../Modules/ElementUtils/ElementUtils';

@Radium
class StructuredArrayItem extends React.Component {
  static propTypes = {
    element: PropTypes.object,
    index: PropTypes.number,
    parentElement: PropTypes.object,
    showArrayItemIndex: PropTypes.bool,
    showBullet: PropTypes.bool,
    style: PropTypes.object,
    collapseByDefault: PropTypes.bool,
  };

  static contextTypes = {
    theme: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      isStructured: isStructured(this.props.element),
      isObject: isObject(this.props.element),
      isArray: isArray(this.props.element),
    };

    // State hasn't been set; tree is expanded by default,
    // after a click, it collapses.
    if (this.state.isStructured) {
      this.state.isExpanded = true;
      this.state.containsStructuredElement =
        containsStructuredElement(this.props.parentElement);
    }
  }

  get style() {
    const { ARRAY_ITEMS_BORDER_COLOR } = this.context.theme;

    const style = {
      base: {
        borderBottom: `1px solid ${ARRAY_ITEMS_BORDER_COLOR}`,
        paddingTop: '8px',
        paddingBottom: '8px',
      },
      column: {
        width: '100%',
      },
      type: {
        root: {
          marginBottom: '4px',
        },
      },
      toggleColumn: {
        width: '30px',
        maxWidth: '30px',
        minWidth: '30px',
      },
      bulletColumn: {
        width: '8px',
        minWidth: '8px',
        maxWidth: '8px',
        height: 'auto',
        alignSelf: 'stretch',
        backgroundImage: `url(${require('./bullet.svg')})`,
        backgroundSize: '8px 8px',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        marginLeft: '16px',
        marginRight: '8px',
      },
    };

    if (isObject(this.props.element)) {
      style.base.paddingTop = '0px';
      style.base.paddingBottom = '0px';
      style.column.paddingLeft = '0px';
      style.column.paddingRight = '0px';
    } else {
      style.column.paddingLeft = '10px';
      style.column.paddingRight = '10px';
    }

    const isLast = isLastArrayItem(this.props.parentElement, this.props.index);

    // Last array item doesn't have a border.
    if (isLast) {
      style.base.borderBottom = 'none';
    }

    if (isObject(this.props.element)) {
      style.base.paddingBottom = '0px';
    }

    return merge(style, this.props.style || {});
  }

  render() {
    const style = this.style;

    return (
      <Row style={style.base}>
        {
          this.props.showArrayItemIndex &&
            <ArrayItemIndex index={this.props.index} />
        }

        {
          this.props.showBullet &&
            <Column style={style.bulletColumn} />
        }

        <Column style={style.column}>
          {
            hasDescription(this.props.element) &&
              <Row>
                <Description element={this.props.element} />
              </Row>
          }

          {
            <Row>
              <Value
                expandableCollapsible
                element={this.props.element}
                parentElement={this.props.parentElement}
                collapseByDefault={this.props.collapseByDefault}
              />
            </Row>
          }
        </Column>
      </Row>
    );
  }
}

export default StructuredArrayItem;
