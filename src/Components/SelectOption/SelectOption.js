import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import merge from 'lodash/merge';

import ObjectProperties from '../ObjectProperties/ObjectProperties';

import { MONO_FONT_FAMILY } from '../../Constants/fonts';

@Radium
class SelectOption extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ]),
    index: PropTypes.number,
    element: PropTypes.object,
    parentElement: PropTypes.object,
    style: PropTypes.object,
    keyWidth: PropTypes.number,
    reportKeyWidth: PropTypes.func,
  };

  static contextTypes = {
    theme: PropTypes.object,
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
        backgroundColor: this.context.theme.BORDER_COLOR,
      },
      tag: {
        width: '20px',
        height: '20px',
        fontSize: '12px',
        display: 'block',
        backgroundColor: this.context.theme.BACKGROUND_COLOR,
        color: this.context.theme.SELECT_TEXT_COLOR,
        fontFamily: MONO_FONT_FAMILY,
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

    return merge(style, this.props.style);
  };

  render() {
    const element = this.props.element;
    element.element = 'object';

    return (
      <div style={this.style.base}>
        <div style={this.style.content}>
          <ObjectProperties
            element={this.props.element}
            reportKeyWidth={this.props.reportKeyWidth}
            keyWidth={this.props.keyWidth}
          />
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
