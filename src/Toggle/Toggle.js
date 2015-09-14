import React from 'react';

import './toggle.styl';

class Toggle extends React.Component {
  getClassNames() {
    var classNames = ['attributeToggle'];

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

export default Toggle;
