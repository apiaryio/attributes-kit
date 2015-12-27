import React from 'react';
import lodash from 'lodash';

class Ruler extends React.Component {
  static propTypes = {
    children: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.array,
    ]),
    style: React.PropTypes.object,
  }

  static contextTypes = {
    theme: React.PropTypes.object,
  }

  constructor(props) {
    super(props);
  }

  renderStyles() {
    const { BORDER_COLOR } = this.context.theme;

    const styles = {
      root: {
        width: '100%',
        height: 'auto',
        paddingLeft: '13px',
        borderLeft: `1px solid ${BORDER_COLOR}`,
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

export default Ruler;
