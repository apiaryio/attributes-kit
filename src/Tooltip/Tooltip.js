import React from 'react';

import './tooltip.styl';

class TooltipComponent extends React.Component {
  render() {
    return (
      <div className="attributeTooltip">
        <span className="attributeTooltipText">
          {this.props.text}
        </span>
      </div>
    );
  }
}

export default TooltipComponent;
