import React from 'react';
import lodash from 'lodash';


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
