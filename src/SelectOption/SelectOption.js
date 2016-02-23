import React from 'react';
import lodash from 'lodash';

import ObjectProperties from 'ObjectProperties/ObjectProperties';

class SelectOption extends React.Component {
  static propTypes = {
    children: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.array,
    ]),
    index: React.PropTypes.number,
    element: React.PropTypes.object,
    parentElement: React.PropTypes.object,
    style: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
  };

  get style() {
    const style = {
      base: {
        width: '100%',
        height: 'auto',
      },
      content: {
        paddingLeft: '10px',
      },
      separator: {
        position: 'relative',
        width: '100%',
        height: '1px',
        paddingLeft: '10px',
      },
      line: {
        display: 'block',
        width: '100%',
        height: '1px',
        backgroundColor: '#E8EBEE',
      },
      tag: {
        width: '20px',
        height: '20px',
        fontSize: '12px',
        display: 'block',
        backgroundColor: 'white',
        fontFamily: 'Source Code Pro',
        fontWeight: '500',
        textAlign: 'center',
        lineHeight: '20px',
        position: 'absolute',
        top: '-10px',
        left: '-10px',
      },
    };

    if (this.props.index === (this.props.parentElement.content.length - 1)) {
      style.separator.display = 'none';
    }

    return lodash.merge(style, this.props.style);
  };

  render() {
    const element = this.props.element;
    element.element = 'object';

    return (
      <div style={this.style.base}>
        <div style={this.style.content}>
          <ObjectProperties element={this.props.element} />
        </div>

        <div style={this.style.separator}>
          <span style={this.style.tag}>OR</span>
          <span style={this.style.line} />
        </div>
      </div>
    );
  };
}

export default SelectOption;
