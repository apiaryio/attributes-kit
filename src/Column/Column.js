import React from 'react';
import lodash from 'lodash';


class Column extends React.Component {
  static propTypes = {
    style: React.PropTypes.object,
    children: React.PropTypes.array,
  }

  getStyles() {
    const styles = {
      flexGrow: 1,
      height: 'auto',
      width: 'auto',
    };

    return lodash.merge(styles, this.props.style);
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
