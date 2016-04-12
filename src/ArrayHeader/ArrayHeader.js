import React from 'react';
import radium from 'radium';

import Row from '../Row/Row';

class ArrayHeader extends React.Component {
  static propTypes = {
    element: React.PropTypes.object,
    parentElement: React.PropTypes.object,
  };

  static contextTypes = {
    theme: React.PropTypes.object,
  };

  get style() {
    const {
      ARRAY_HEADER_BORDER_COLOR,
      ARRAY_HEADER_BACKGROUND_COLOR,
    } = this.context.theme;

    const style = {
      base: {
        border: `1px solid ${ARRAY_HEADER_BORDER_COLOR}`,
        borderBottom: 'none',
        height: '5px',
        width: '100%',
        backgroundColor: ARRAY_HEADER_BACKGROUND_COLOR,
      },
    };

    return style;
  }

  render() {
    return (
      <Row style={this.style.base} />
    );
  };
}

export default radium(ArrayHeader);
