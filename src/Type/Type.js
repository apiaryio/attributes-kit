import React from 'react';
import lodash from 'lodash';

import {
  getType,
} from '../elements/element';

class Type extends React.Component {
  static propTypes = {
    type: React.PropTypes.string,
    element: React.PropTypes.object,
    onClick: React.PropTypes.func,
    style: React.PropTypes.object,
  };

  static contextTypes = {
    theme: React.PropTypes.object,
  };

  getStyles() {
    const { TYPE_COLOR } = this.context.theme;

    const styles = {
      root: {
        width: '100%',
        fontFamily: 'Source Code Pro',
        fontWeight: 'regular',
        fontSize: '14px',
        color: TYPE_COLOR,
      },
    };

    return lodash.merge(styles, this.props.style || {});
  }

  render() {
    if (this.props.type) {
      return (
        <div
          style={this.getStyles().root}
          onClick={this.props.onClick}
        >
          {this.props.type}
        </div>
      );
    }

    if (this.props.element) {
      const type = getType(this.props.element);

      if (type) {
        return (
          <div
            style={this.getStyles().root}
            onClick={this.props.onClick}
          >
            {type}
          </div>
        );
      }
    }
  }
}

export default Type;
