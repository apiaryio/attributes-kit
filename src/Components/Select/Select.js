import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import merge from 'lodash/merge';
import isEmpty from 'lodash/isEmpty';

import Row from '../Row/Row';
import Column from '../Column/Column';

import SelectOption from '../SelectOption/SelectOption';

@Radium
class Select extends React.Component {
  static propTypes = {
    element: PropTypes.object,
    parentElement: PropTypes.object,
    keyWidth: PropTypes.number,
    reportKeyWidth: PropTypes.func,
  };

  static contextTypes = {
    theme: PropTypes.object,
    eventEmitter: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      isExpanded: true,
    };

    this.keyWidthsIndex = {};
  };

  get style() {
    const style = {
      column: {
        width: '2px',
        backgroundColor: this.context.theme.SELECT_LINE_COLOR,
      },
    };

    return merge(style, {});
  };

  handleExpandCollapse = () => {
    this.setState({
      isExpanded: !this.state.isExpanded,
    });
  };

  renderOptions() {
    return this.props.element.content.map((element, index) =>
      <SelectOption
        key={index}
        index={index}
        element={element}
        parentElement={this.props.element}
        reportKeyWidth={this.props.reportKeyWidth}
        keyWidth={this.props.keyWidth}
      />
    );
  };

  render() {
    if (isEmpty(this.props.element.content)) {
      return null;
    }

    return (
      <Row>
        <Column style={this.style.column} />

        <Column>
          {this.renderOptions()}
        </Column>
      </Row>
    );
  };
}

export default Select;
