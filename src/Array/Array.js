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
    data: React.PropTypes.object,
  }

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
  }

  renderStyles() {
    const styles = {
      arrayItems: {
        root: {
          border: '1px solid #E8EBEE',
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
          this.props.data.content.map((element, index) => {
            if (isStructured(element)) {
              return (
                <StructuredArrayItem
                  key={index}
                  index={index}
                  element={element}
                  parentElement={this.props.data} />
              );
            }

            return (
              <ArrayItem
                key={index}
                index={index}
                element={element}
                parentElement={this.props.data} />
            );
          })
        }
      </ArrayItems>
    );
  }

  render() {
    const styles = this.renderStyles();

    if (!this.props.data.content) {
      return false;
    }

    return (
      <Row>
        <Column>
          <ArrayHeader
            element={this.props.data}
            isExpanded={this.state.isExpanded}
            onSampleToggleClick={this.handleExpandCollapse}
            sampleTitle="Description"
          />

          {this.renderArrayItems(styles)}

          <ArraySamples element={this.props.data} />
          <ArrayDefaults element={this.props.data} />
        </Column>
      </Row>
    );
  }
}

export default ArrayComponent;
