import React from 'react';

import Row from 'Row/Row';
import Column from 'Column/Column';

import ArrayItem from 'ArrayItem/ArrayItem';
import StructuredArrayItem from 'ArrayItem/StructuredArrayItem';
import ArrayItems from 'ArrayItems/ArrayItems';
import ArrayHeader from 'ArrayHeader/ArrayHeader';
import ArraySamples from 'ArraySamples/ArraySamples';
import ArrayDefaults from 'ArrayDefaults/ArrayDefaults';

import {
  isStructured,
} from 'elements/expandableCollapsibleElement';


class ArrayComponent extends React.Component {
  static propTypes = {
    element: React.PropTypes.object,
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

  renderStyles() {
    const { ARRAY_ITEMS_BORDER_COLOR } = this.context.theme;

    const styles = {
      arrayItems: {
        root: {
          border: `1px solid ${ARRAY_ITEMS_BORDER_COLOR}`,
        },
      },
    };

    return styles;
  }

  renderArrayItems(styles) {
    if (!this.state.isExpanded) {
      return false;
    }

    return (
      <ArrayItems style={styles.arrayItems}>
        {
          this.props.element.content.map((element, index) => {
            if (isStructured(element)) {
              return (
                <StructuredArrayItem
                  key={index}
                  index={index}
                  element={element}
                  parentElement={this.props.element}
                />
              );
            }

            return (
              <ArrayItem
                key={index}
                index={index}
                element={element}
                parentElement={this.props.element}
              />
            );
          })
        }
      </ArrayItems>
    );
  }

  render() {
    const styles = this.renderStyles();

    if (!this.props.element.content) {
      return false;
    }

    return (
      <Row>
        <Column>
          <ArrayHeader
            element={this.props.element}
            isExpanded={this.state.isExpanded}
            onSampleToggleClick={this.handleExpandCollapse}
            sampleTitle="Description"
          />

          {this.renderArrayItems(styles)}

          <ArraySamples element={this.props.element} />
          <ArrayDefaults element={this.props.element} />
        </Column>
      </Row>
    );
  }
}

export default ArrayComponent;
