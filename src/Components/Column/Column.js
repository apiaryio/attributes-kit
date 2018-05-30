import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import merge from 'lodash/merge';

@Radium
class Column extends React.Component {
  static propTypes = {
    style: PropTypes.object,
    children: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ]),
  };

  get style() {
    const style = {
      height: 'auto',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'no-wrap',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    };

    return merge(style, this.props.style);
  }

  render() {
    return (
      <div style={this.style}>
        {this.props.children}
      </div>
    );
  }
}

export default Column;
