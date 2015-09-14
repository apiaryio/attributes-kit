import React from 'react';

import './toggle.styl';

class Toggle extends React.Component {
  getClassNames() {
    const classNames = ['attributeToggle'];

    if (this.props.isExpanded) {
      classNames.push('isExpanded');
    } else {
      classNames.push('isCollapsed');
    }

    return classNames;
  }

  render() {
    return (
      <div className={this.getClassNames().join(' ')} onClick={this.props.expandCollapseEventHandler}>
        <span className="attributeToggleIcon"></span>
      </div>
    );
  }
}

Toggle.propTypes = {
  isExpanded: React.PropTypes.boolean,
  expandCollapseEventHandler: React.PropTypes.func,
};

export default Toggle;
