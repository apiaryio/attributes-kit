import React from 'react';
import lodash from 'lodash';

import ObjectProperty from 'ObjectProperty/ObjectProperty';
import StructuredObjectProperty from 'ObjectProperty/StructuredObjectProperty';

import {
  isStructured,
} from 'elements/expandableCollapsibleElement';

import {
  getType,
} from 'elements/element';


class ObjectProperties extends React.Component {
  static propTypes = {
    element: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

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
            if (getType(element) === 'enum' || getType(element) === 'select') {
              return false;
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
