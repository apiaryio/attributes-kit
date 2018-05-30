import Radium from 'radium';
import React from 'react';
import PropTypes from 'prop-types';

import Column from '../Column/Column';
import Type from '../Type/Type';

import {
  getReference,
} from '../../Modules/ElementUtils/ElementUtils';

@Radium
class TypeColumn extends React.Component {
  static propTypes = {
    element: PropTypes.object,
  };

  static contextTypes = {
    namedTypes: PropTypes.bool,
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
