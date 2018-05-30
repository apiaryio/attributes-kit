import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';

import merge from 'lodash/merge';

@Radium
class Toggle extends React.Component {
  static propTypes = {
    isExpanded: PropTypes.bool,
    onClick: PropTypes.func,
    style: PropTypes.object,
  };

  get style() {
    const style = {};

    style.base = {
      width: '13px',
      height: '13px',
    };

    style.icon = {
      width: '13px',
      height: '13px',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    };

    if (this.props.isExpanded) {
      style.icon.backgroundImage = `url(${require('./arrowExpanded.svg')})`;
      style.icon.backgroundSize = '13px 8px';
    } else {
      style.icon.backgroundImage = `url(${require('./arrowCollapsed.svg')})`;
      style.icon.backgroundSize = '8px 13px';
    }

    return merge(style, this.props.style || {});
  };

  render() {
    return (
      <div
        onClick={this.props.onClick}
        style={this.style.base}
      >
        <div style={this.style.icon} />
      </div>
    );
  };
}

export default Toggle;
