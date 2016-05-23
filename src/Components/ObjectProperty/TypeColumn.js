import Radium from 'radium';
import React from 'react';

import Column from '../Column/Column';
import Type from '../Type/Type';

import {
  getReference,
} from '../../Modules/ElementUtils/ElementUtils';

@Radium
class TypeColumn extends React.Component {
  static propTypes = {
    element: React.PropTypes.object,
  };

  static contextTypes = {
    namedTypes: React.PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = this.transformPropsIntoState(props);
  };

  componentWillReceiveProps = (nextProps) => {
    this.setState(
      this.transformPropsIntoState(nextProps)
    );
  };

  transformPropsIntoState(props) {
    return {
      reference: getReference(props.element),
    };
  };

  render() {
    if (this.context.namedTypes && this.state.reference) {
      return (
        <Column>
          <Type
            element={this.props.element}
            reference={this.state.reference}
          />
        </Column>
      );
    }

    return (
      <Column>
        <Type
          element={this.props.element}
        />
      </Column>
    );
  };
};

export { TypeColumn };
