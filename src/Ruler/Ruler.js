import React from 'react';
import _ from 'lodash';


class Ruler extends React.Component {
  static propTypes = {

  }

  constructor(props) {
    super(props);
  }

  renderStyles() {
    let styles = {
      root: {
        width: '100%',
        height: 'auto',
        paddingLeft: '13px',
        borderLeft: '1px solid #E8EBEE',
      }
    };

    return _.merge(styles, this.props.style || {});
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

export default Ruler;
