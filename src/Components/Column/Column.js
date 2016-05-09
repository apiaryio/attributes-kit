import React from 'react';
import merge from 'lodash/merge';


class Column extends React.Component {
  static propTypes = {
    style: React.PropTypes.object,
    children: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.array,
    ]),
  };

  getStyles() {
    const styles = {
      height: 'auto',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'no-wrap',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    };

    return merge(styles, this.props.style);
  }

  render() {
    return (
      <div style={this.getStyles()}>
        {this.props.children}
      </div>
    );
  }
}

export default Column;
