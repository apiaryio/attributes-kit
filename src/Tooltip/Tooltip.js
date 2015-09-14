import React from 'react';

import './tooltip.styl';

class Tooltip extends React.Component {
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

Tooltip.propTypes = {
  text: React.PropTypes.string,
};

export default Tooltip;
