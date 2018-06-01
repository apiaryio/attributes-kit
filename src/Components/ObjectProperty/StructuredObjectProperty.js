import merge from 'lodash/merge';
import Radium from 'radium';
import React from 'react';
import PropTypes from 'prop-types';

import Column from '../Column/Column';
import Description from '../Description/Description';
import Row from '../Row/Row';
import Ruler from '../Ruler/Ruler';
import { KeyColumn } from './KeyColumn';
import { ToggleColumn } from './ToggleColumn';
import { TypeColumn } from './TypeColumn';
import { Value } from '../Value/Value';

import {
  containsSelectElement,
  containsStructuredElement,
  hasDescription,
  isArray,
  isArrayOrEnumOrSelect,
  isLastArrayItem,
  isObject,
  isStructured,
} from '../../Modules/ElementUtils/ElementUtils';

@Radium
class StructuredObjectProperty extends React.Component {
  static propTypes = {
    collapseByDefault: PropTypes.bool,
    element: PropTypes.object,
    index: PropTypes.number,
    keyWidth: PropTypes.number,
    parentElement: PropTypes.object,
    reportKeyWidth: PropTypes.func,
    style: PropTypes.object,
  };

  static contextTypes = {
    element: PropTypes.object,
    theme: PropTypes.object,
    showMemberParentLinks: PropTypes.bool,
    namedTypes: PropTypes.bool,
    onElementLinkClick: PropTypes.func,
    includedProperties: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
    ]),
    inheritedProperties: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
    ]),
  };


  constructor(props) {
    super(props);

    this.state = this.transformPropsIntoState(props);
  };

  componentWillReceiveProps = (nextProps) => {
    this.setState(
      this.transformPropsIntoState(nextProps)
    );
  };

  transformPropsIntoState(props) {
    let isExpanded;

    // State hasn't been set; tree is expanded by default,
    // after a click, it collapses.
    if (isStructured(props.element)) {
      if (props.collapseByDefault) {
        isExpanded = false;
      } else {
        isExpanded = true;
      }
    }

    return {
      containsStructuredElement: containsStructuredElement(this.props.parentElement),
      isArray: isArray(props.element),
      isStructured: isStructured(props.element),
      isExpanded,
      isObject: isObject(props.element),
    };
  };

  handleExpandCollapse = () => {
    this.setState({
      isExpanded: !this.state.isExpanded,
    });
  };

  get style() {
    const {
      BORDER_COLOR,
      ROW_PADDING_TOP,
      ROW_PADDING_BOTTOM,
    } = this.context.theme;

    const style = {
      base: {
        borderBottom: `1px solid ${BORDER_COLOR}`,
        paddingTop: ROW_PADDING_TOP,
        paddingBottom: ROW_PADDING_BOTTOM,
      },
      firstRow: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      valueRow: {
        // marginTop: '8px',
      },
      ruler: {
        base: {
          paddingLeft: '6px',
        },
      },
      Description: {
        base: {
          marginTop: '4px',
        },
      },
    };

    if (this.props.element.meta && (this.props.element.meta._nestedLevel !== 0)) {
      style.base.paddingLeft = '10px';
    }

    const isLast = isLastArrayItem(this.props.parentElement, this.props.index);

    // Last array item doesn't have a border.
    if (isLast) {
      style.base.borderBottom = 'none';
    }

    style.base.paddingBottom = '14px';

    if (hasDescription(this.props.element)) {
      style.firstRow.paddingBottom = '14px';

      style.Description = {
        base: {
          marginBottom: '14px',
          paddingLeft: '13px',
        },
      };
    } else {
      style.firstRow.paddingBottom = '14px';
    }

    if (containsSelectElement(this.props.parentElement)) {
      style.base.paddingLeft = '21px';
    }

    return merge(style, this.props.style || {});
  };

  render() {
    return (
      <Row style={this.style.base}>
        <Column>
          <Row style={this.style.firstRow}>
            <ToggleColumn
              isExpanded={this.state.isExpanded}
              onClick={this.handleExpandCollapse}
            />

            <KeyColumn
              element={this.props.element}
              parentElement={this.props.parentElement}
              onClick={this.handleExpandCollapse}
              reportKeyWidth={this.props.reportKeyWidth}
              keyWidth={this.props.keyWidth}
            />

            <TypeColumn
              element={this.props.element}
            />
          </Row>

          {
            this.state.isExpanded &&
              <Ruler
                style={this.style.ruler}
                subtle={isArrayOrEnumOrSelect(this.props.element)}
              >
                {
                  hasDescription(this.props.element) &&
                    <Row>
                      <Description
                        element={this.props.element}
                        style={this.style.Description}
                      />
                    </Row>
                }

                <Row style={this.style.valueRow}>
                  <Value
                    element={this.props.element}
                    parentElement={this.props.parentElement}
                    collapseByDefault={this.props.collapseByDefault}
                  />
                </Row>
              </Ruler>
          }
        </Column>
      </Row>
    );
  };
}

export default StructuredObjectProperty;
