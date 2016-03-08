import React from 'react';
import merge from 'lodash/merge';


class Row extends React.Component {
  static propTypes = {
    onClick: React.PropTypes.func,
    style: React.PropTypes.object,
    children: React.PropTypes.any,
  };

  getStyles() {
    const styles = {
      width: '100%',
      height: 'auto',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'no-wrap',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      position: 'relative',
    };

    return merge(styles, this.props.style || {});
  }

  render() {
    return (
      <div
        style={this.getStyles()}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Row;
