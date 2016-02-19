import React from 'react';

class Tooltip extends React.Component {
  static propTypes = {
    text: React.PropTypes.string,
  };

  render() {
    return (
      <div className="attributeTooltip" style={{display: 'none'}}>
        <span className="attributeTooltipText">
          {this.props.text}
        </span>
      </div>
    );
  }
}

export default Tooltip;
