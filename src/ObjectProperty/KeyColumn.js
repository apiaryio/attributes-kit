import Radium from 'radium';
import React from 'react';

import Column from '../Column/Column';
import Key from '../Key/Key';
import Requirement from '../Requirement/Requirement';

@Radium
class KeyColumn extends React.Component {
  static propTypes = {
    element: React.PropTypes.object,
    onClick: React.PropTypes.func,
  };

  get style() {
    const style = {

    };

    return style;
  };

  render() {
    return (
      <Column style={this.style.keyColumn}>
        <Key
          onClick={this.props.onClick}
          element={this.props.element}
          ref="key"
        />

        <Requirement
          element={this.props.element}
        />
      </Column>
    );
  };
};

export {KeyColumn};
