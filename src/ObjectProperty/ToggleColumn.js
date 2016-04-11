import Radium from 'radium';
import React from 'react';

import Column from '../Column/Column';
import Toggle from '../Toggle/Toggle';

@Radium
class ToggleColumn extends React.Component {
  static contextTypes = {
    includedProperties: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.string,
    ]),
    inheritedProperties: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.string,
    ]),
  };

  get style() {
    const style = {
      base: {
        width: '20px',
        maxWidth: '20px',
        minWidth: '20px',
      },
    };

    return style;
  };

  isVisible() {
    return (
      (
        this.context.includedProperties === 'show' &&
        this.context.inheritedProperties === 'show'
      ) || (
        this.context.includedProperties === 'tag' &&
        this.context.inheritedProperties === 'tag'
      )
    );
  }

  render() {
    if (this.isVisible()) {
      return (
        <Column style={this.style.base}>
          <Toggle
            isExpanded={this.props.isExpanded}
            onClick={this.props.onClick}
          />
        </Column>
      );
    }

    return null;
  };
};

export {ToggleColumn};
