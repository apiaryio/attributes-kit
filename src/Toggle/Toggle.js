import React from 'react';
import classNames from 'classnames';

import './toggle.styl';

class Toggle extends React.Component {
  static propTypes = {
    isExpanded: React.PropTypes.boolean,
    expandCollapseEventHandler: React.PropTypes.func,
  }

  getClassNames() {
    return classNames('attributeToggle', {
      isExpanded: this.props.isExpanded,
      isCollapsed: !this.props.isExpanded,
    });
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
