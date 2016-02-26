import React from 'react';
import lodash from 'lodash';

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
  };

  getStyles() {
    return {
      root: {
        width: '100%',
        height: 'auto',
      },
    };
  }

  render() {
    if (!this.props.element) {
      return false;
    }

    if (lodash.isEmpty(this.props.element.content)) {
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
                />
              );
            }

            return (
              <ObjectProperty
                key={index}
                index={index}
                element={element}
                parentElement={this.props.element}
              />
            );
          })
        }
      </div>
    );
  }
}

export default ObjectProperties;
