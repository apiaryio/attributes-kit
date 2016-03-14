import merge from 'lodash/merge';
import radium from 'radium';
import React from 'react';

import ArrayDefaults from '../ArrayDefaults/ArrayDefaults';
import ArrayHeader from '../ArrayHeader/ArrayHeader';
import ArrayItem from '../ArrayItem/ArrayItem';
import ArrayItems from '../ArrayItems/ArrayItems';
import ArraySamples from '../ArraySamples/ArraySamples';
import Column from '../Column/Column';
import Row from '../Row/Row';
import StructuredArrayItem from '../ArrayItem/StructuredArrayItem';

import {
  hasDefaults,
  hasMembers,
  hasSamples,
} from '../elements/element';

import {
  isStructured,
} from '../elements/expandableCollapsibleElement';

class ArrayComponent extends React.Component {
  static propTypes = {
    element: React.PropTypes.object,
    parentElement: React.PropTypes.object,
    style: React.PropTypes.object,
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

  get style() {
    const { ARRAY_ITEMS_BORDER_COLOR } = this.context.theme;

    const style = {
      arrayItems: {
        root: {
          border: `1px solid ${ARRAY_ITEMS_BORDER_COLOR}`,
        },
      },
    };

    return merge(style, this.props.style || {});
  }

  handleExpandCollapse = () => {
    this.setState({
      isExpanded: !this.state.isExpanded,
    });
  };

  renderArrayItems() {
    if (!this.state.isExpanded) {
      return false;
    }

    let showArrayItemIndex;
    let showBullet;

    switch (this.props.element.element) {
      case 'enum':
        showArrayItemIndex = false;
        showBullet = true;
        break;
      case 'array':
        showArrayItemIndex = true;
        showBullet = false;
        break;
      default:
        showArrayItemIndex = true;
        showBullet = false;
    }

    return (
      <ArrayItems style={this.style.arrayItems}>
        {
          this.props.element.content.map((element, index) => {
            if (isStructured(element)) {
              return (
                <StructuredArrayItem
                  key={index}
                  index={index}
                  element={element}
                  parentElement={this.props.element}
                  showArrayItemIndex={showArrayItemIndex}
                  showBullet={showBullet}
                />
              );
            }

            return (
              <ArrayItem
                key={index}
                index={index}
                element={element}
                parentElement={this.props.element}
                showArrayItemIndex={showArrayItemIndex}
                showBullet={showBullet}
              />
            );
          })
        }
      </ArrayItems>
    );
  }

  render() {
    if (!this.props.element.content) {
      return false;
    }

    return (
      <Row>
        <Column>
          <ArrayHeader
            element={this.props.element}
            parentElement={this.props.parentElement}
            isExpanded={this.state.isExpanded}
            onSampleToggleClick={this.handleExpandCollapse}
            sampleTitle="Description"
          />

          {
            hasMembers(this.props.element) &&
              this.renderArrayItems()
          }

          {
            hasSamples(this.props.element) &&
              <ArraySamples element={this.props.element} />
          }

          {
            hasDefaults(this.props.element) &&
              <ArrayDefaults element={this.props.element} />
          }
        </Column>
      </Row>
    );
  }
}

export default radium(ArrayComponent);
