import React from 'react';

import './toggle.styl';

class Toggle extends React.Component {
  static propTypes = {
    isExpanded: React.PropTypes.boolean,
    expandCollapseEventHandler: React.PropTypes.func,
  }

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
      <div className={this.getClassNames()} onClick={this.props.expandCollapseEventHandler}>
        <span className="attributeToggleIcon"></span>
      </div>
    );
  }
}

export default Toggle;
