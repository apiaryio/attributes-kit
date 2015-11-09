import React from 'react';

import Tooltip from 'Tooltip/Tooltip';


class Requirement extends React.Component {
  static propTypes = {
    data: React.PropTypes.object,
  }

  getRequirement() {
    let requirement = ['optional'];

    if (this.props.data.attributes) {
      if (this.props.data.attributes.typeAttributes) {
        requirement = this.props.data.attributes.typeAttributes;
      }
    }

    return requirement;
  }

  renderStyles() {
    let styles = {
      root: {
        float: 'left',
        width: '100%',
        height: 'auto'
      },
      asterisk: {
        float: 'left',
        width: '10px',
        height: '11px',
        backgroundImage: `url(${require('./asterisk.svg')})`,
        backgroundSize: '10px 11px',
        backgroundRepeat: 'no-repeat',
      }
    };

    return styles;
  }

  renderAsterisk(requirement, styles) {
    if (requirement[0] === 'required') {
      return (
        <span style={styles.asterisk}></span>
      );
    }
  }

  render() {
    const styles = this.renderStyles();
    const requirement = this.getRequirement();

    return (
      <div style={styles.root}>
        {this.renderAsterisk(requirement, styles)}
        <Tooltip text={requirement.join(' ')} />
      </div>
    );
  }
}

export default Requirement;
