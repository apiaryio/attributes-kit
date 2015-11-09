import React from 'react';
import _ from 'lodash';


class Column extends React.Component {
  static propTypes = {
    style: React.PropTypes.Object,
  }

  getStyles() {
    let styles = {
      flexGrow: 1,
      height: 'auto',
      width: 'auto',
    };

    return _.merge(styles, this.props.style);
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
