import React from 'react';
import lodash from 'lodash';


class Row extends React.Component {
  static propTypes = {
    onClick: React.PropTypes.func,
    style: React.PropTypes.object,
    children: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.array,
    ]),
  }

  constructor(props) {
    super(props);
  }

  getStyles() {
    const styles = {
      width: '100%',
      height: 'auto',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'no-wrap',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      position: 'relative',
    };

    return lodash.merge(styles, this.props.style || {});
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
