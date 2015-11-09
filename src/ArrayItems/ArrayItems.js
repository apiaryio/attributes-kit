import React from 'react';
import lodash from 'lodash';


class ArrayItems extends React.Component {
  static propTypes = {
    style: React.PropTypes.object,
    children: React.PropTypes.array,
  }

  constructor(props) {
    super(props);
  }

  renderStyles() {
    const styles = {
      root: {
        width: '100%',
        height: 'auto',
      },
    };

    return lodash.merge(styles, this.props.style || {});
  }

  render() {
    const styles = this.renderStyles();

    return (
      <div style={styles.root}>
        {this.props.children}
      </div>
    );
  }
}

export default ArrayItems;
