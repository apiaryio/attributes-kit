import React from 'react';

import './tooltip.styl';

class Tooltip extends React.Component {
  static propTypes = {
    text: React.PropTypes.string,
  };

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

export default Tooltip;
