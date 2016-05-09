import merge from 'lodash/merge';
import radium from 'radium';
import React from 'react';

import Column from '../Column/Column';
import Description from '../Description/Description';
import ObjectPropertyDefaults from '../ObjectPropertyDefaults/ObjectPropertyDefaults';
import ObjectPropertySamples from '../ObjectPropertySamples/ObjectPropertySamples';
import Row from '../Row/Row';
import Ruler from '../Ruler/Ruler';
import { KeyColumn } from './KeyColumn';
import { ToggleColumn } from './ToggleColumn';
import { TypeColumn } from './TypeColumn';

import {
  isExpandableCollapsible,
  containsExpandableCollapsibleElement,
  renderValue,
} from '../elements/expandableCollapsibleElement';

import {
  hasDefaults,
  hasDescription,
  hasSamples,
  isArray,
  isArrayOrEnumOrSelect,
  isLastArrayItem,
  isObject,
} from '../elements/element';

class StructuredObjectProperty extends React.Component {
  static propTypes = {
    collapseByDefault: React.PropTypes.bool,
    element: React.PropTypes.object,
    index: React.PropTypes.number,
    keyWidth: React.PropTypes.number,
    parentElement: React.PropTypes.object,
    reportKeyWidth: React.PropTypes.func,
    style: React.PropTypes.object,
  };

  static contextTypes = {
    element: React.PropTypes.object,
    theme: React.PropTypes.object,
    showMemberParentLinks: React.PropTypes.bool,
    namedTypes: React.PropTypes.bool,
    onElementLinkClick: React.PropTypes.func,
    includedProperties: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.string,
    ]),
    inheritedProperties: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.string,
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
    if (isExpandableCollapsible(props.element)) {
      if (props.collapseByDefault) {
        isExpanded = false;
      } else {
        isExpanded = true;
      }
    }

    return {
      containsExpandableCollapsibleElement:
        containsExpandableCollapsibleElement(this.props.parentElement.content),

      isArray: isArray(props.element),
      isExpandableCollapsible: isExpandableCollapsible(props.element),
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
                  {
                    renderValue(this.props.element, {
                      parentElement: this.props.parentElement,
                    })
                  }
                </Row>
              </Ruler>
          }

          <Row>
            {
              hasSamples(this.props.element) &&
                <ObjectPropertySamples element={this.props.element} />
            }

            {
              hasDefaults(this.props.element) &&
                <ObjectPropertyDefaults element={this.props.element} />
            }
          </Row>
        </Column>
      </Row>
    );
  };
}

export default radium(StructuredObjectProperty);
