import isEmpty from 'lodash/isEmpty';
import values from 'lodash/values';
import max from 'lodash/max';
import React from 'react';

import Select from '../Select/Select';
import ObjectProperty from '../ObjectProperty/ObjectProperty';
import StructuredObjectProperty from '../ObjectProperty/StructuredObjectProperty';

import {
  isStructured,
} from '../elements/expandableCollapsibleElement';

import {
  isSelect,
} from '../elements/element';

class ObjectProperties extends React.Component {
  static propTypes = {
    element: React.PropTypes.object,
    collapseByDefault: React.PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = {
      keyWidth: null,
    };

    this.keyWidthsIndex = {};
  }

  getStyles() {
    return {
      root: {
        width: '100%',
        height: 'auto',
      },
    };
  }

  reportKeyWidth = (keyIdentifier, keyWidth) => {
    this.keyWidthsIndex[keyIdentifier] = keyWidth;

    const keyWidths = values(this.keyWidthsIndex);

    if (keyWidths.length === this.props.element.content.length) {
      this.setState({
        keyWidth: max(keyWidths),
      });
    }
  }

  render() {
    if (!this.props.element) {
      return false;
    }

    if (isEmpty(this.props.element.content)) {
      return false;
    }

    return (
      <div style={this.getStyles().root}>
        {
          this.props.element.content.map((element, index) => {
            if (isSelect(element)) {
              return (
                <Select
                  key={index}
                  index={index}
                  element={element}
                  parentElement={this.props.element}
                />
              );
            }

            if (isStructured(element)) {
              return (
                <StructuredObjectProperty
                  key={index}
                  index={index}
                  element={element}
                  parentElement={this.props.element}
                  collapseByDefault={this.props.collapseByDefault}
                  reportKeyWidth={this.reportKeyWidth}
                  keyWidth={this.state.keyWidth}
                />
              );
            }

            return (
              <ObjectProperty
                key={index}
                index={index}
                element={element}
                parentElement={this.props.element}
                collapseByDefault={this.props.collapseByDefault}
                reportKeyWidth={this.reportKeyWidth}
                keyWidth={this.state.keyWidth}
              />
            );
          })
        }
      </div>
    );
  }
}

export default ObjectProperties;
