import React from 'react';

class Requirement extends React.Component {
  static propTypes = {
    element: React.PropTypes.object,
  };

  getRequirement() {
    let requirement = ['optional'];

    if (this.props.element.attributes) {
      if (this.props.element.attributes.typeAttributes) {
        requirement = this.props.element.attributes.typeAttributes;
      }
    }

    return requirement;
  }

  renderStyles() {
    const styles = {
      root: {
        float: 'left',
        width: '100%',
        height: 'auto',
      },
      asterisk: {
        float: 'left',
        width: '10px',
        height: '11px',
        backgroundImage: `url(${require('./asterisk.svg')})`,
        backgroundSize: '10px 11px',
        backgroundRepeat: 'no-repeat',
      },
    };

    return styles;
  }

  renderAsterisk(requirement, styles) {
    if (requirement[0] === 'required') {
      return (
        <span style={styles.asterisk}></span>
      );
    }

    return false;
  }

  render() {
    const styles = this.renderStyles();
    const requirement = this.getRequirement();

    return (
      <div style={styles.root}>
        {this.renderAsterisk(requirement, styles)}
      </div>
    );
  }
}

export default Requirement;
