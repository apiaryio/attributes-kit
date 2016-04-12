import React from 'react';


class Toggle extends React.Component {
  static propTypes = {
    isExpanded: React.PropTypes.bool,
    onClick: React.PropTypes.func,
  };

  renderStyles() {
    const styles = {};

    styles.root = {
      width: '100%',
      height: 'auto',
    };

    styles.icon = {
      width: '100%',
      height: '20px',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'left center',
    };

    if (this.props.isExpanded) {
      styles.icon.backgroundImage = `url(${require('./arrowExpanded.svg')})`;
      styles.icon.backgroundSize = '13px 8px';
    } else {
      styles.icon.backgroundImage = `url(${require('./arrowCollapsed.svg')})`;
      styles.icon.backgroundSize = '8px 13px';
    }

    return styles;
  }

  render() {
    return (
      <div
        onClick={this.props.onClick}
        style={this.renderStyles().root}
      >
        <div style={this.renderStyles().icon}></div>
      </div>
    );
  }
}

export default Toggle;
