import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';

import { DEFAULT_FONT_FAMILY } from '../../Constants/fonts';

class Requirement extends React.Component {
  static propTypes = {
    element: PropTypes.object,
  };

  get requirement() {
    let requirement = ['optional'];

    if (this.props.element.attributes) {
      if (this.props.element.attributes.typeAttributes) {
        requirement = this.props.element.attributes.typeAttributes;
      }
    }

    return requirement;
  };

  get style() {
    const style = {
      base: {
        width: '100%',
        height: 'auto',
        fontFamily: DEFAULT_FONT_FAMILY,
        fontSize: '12px',
        color: '#A7AAB2',
      },
    };

    return style;
  };

  render() {
    const isRequired = this.requirement[0] === 'required';

    if (isRequired) {
      return (
        <div style={this.style.base}>
          required
        </div>
      );
    }

    return null;
  }
}

export default radium(Requirement);
