import React from 'react';
import _ from 'underscore';

class Row extends React.Component {
  static propTypes = {

  }

  constructor(props) {
    super(props);
  }

  getStyles() {
    let styles = {
      width: '100%',
      height: 'auto',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'no-wrap',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      position: 'relative',
    };

    return _.extend(styles, this.props.style);
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
