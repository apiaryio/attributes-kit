import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import merge from 'lodash/merge';

import {
  findElement,
} from '../../Modules/ElementUtils/ElementUtils';

import { DEFAULT_FONT_FAMILY } from '../../Constants/fonts';

class ObjectPropertiesGroup extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    name: PropTypes.string,
    style: PropTypes.object,
    type: PropTypes.string,
  };

  static contextTypes = {
    dereferencedDataStructures: PropTypes.array,
    onElementLinkClick: PropTypes.func,
    includedProperties: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
    ]),
    inheritedProperties: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
    ]),
  };

  get style() {
    const style = {
      base: {

      },
      header: {
        borderBottom: '1px solid #E8EBEE',
        color: 'rgba(138, 147, 163, 0.75)',
        fontFamily: DEFAULT_FONT_FAMILY,
        fontSize: '12px',
        fontStyle: 'italic',
        paddingBottom: '4px',
        paddingTop: '4px',
      },
      headerLink: {
        cursor: 'pointer',

        ':hover': {
          textDecoration: 'underline',
        },
      },
      placeholder: {
        paddingBottom: '4px',
        paddingTop: '4px',
        fontFamily: DEFAULT_FONT_FAMILY,
        fontSize: '12px',
        color: '#8A93A3',
        fontStyle: 'italic',
      },
      placeholderProperties: {
        fontWeight: '600',
      },
      placeholderLink: {
        cursor: 'pointer',
        fontWeight: 'regular',
        textDecoration: 'underline',

        ':hover': {
          textDecoration: 'none',
        },
      },
    };

    if (!this.props.type) {
      style.base.borderBottom = '1px solid #E8EBEE';
    }

    return merge(style, this.props.style || {});
  }

  handleClick = (event) => {
    const element = findElement(this.props.name, this.context.dereferencedDataStructures);

    if (this.context.onElementLinkClick) {
      return this.context.onElementLinkClick(
        element.meta.id, element, event
      );
    }

    return null;
  }

  renderHeader() {
    if (!this.props.type) {
      return null;
    }

    let text;

    if (this.props.type === 'inherited') {
      text = 'Inherited from';
    }

    if (this.props.type === 'included') {
      text = 'Included from';
    }

    return (
      <div style={this.style.header}>
        {text}
        &nbsp;
        <a style={this.style.headerLink} onClick={this.handleClick}>
          {this.props.name}
        </a>
      </div>
    );
  }

  renderProperties() {
    const propertiesCount = this.props.children.length;

    if (this.props.type === 'inherited' && this.context.inheritedProperties === 'placeholder') {
      return (
        <div style={this.style.placeholder}>
          <span style={this.style.placeholderProperties}>
            {propertiesCount} {propertiesCount === 1 ? 'property' : 'properties'}
          </span>
          &nbsp;inherited from&nbsp;
          <a style={this.style.placeholderLink} onClick={this.handleClick}>
            {this.props.name}
          </a>
        </div>
      );
    }

    if (this.props.type === 'included' && this.context.includedProperties === 'placeholder') {
      return (
        <div style={this.style.placeholder}>
          <span style={this.style.placeholderProperties}>
            {propertiesCount} {propertiesCount === 1 ? 'property' : 'properties'}
          </span>
          &nbsp;included from&nbsp;
          <a style={this.style.placeholderLink} onClick={this.handleClick}>
            {this.props.name}
          </a>
        </div>
      );
    }

    return (
      <div>
        {this.props.children}
      </div>
    );
  }

  render() {
    return (
      <div style={this.style.base}>
        {
          (this.props.type === 'inherited' && this.context.inheritedProperties === 'group') &&
            this.renderHeader()
        }

        {
          (this.props.type === 'included' && this.context.includedProperties === 'group') &&
            this.renderHeader()
        }

        {
          this.renderProperties()
        }
      </div>
    );
  }
}

export default radium(ObjectPropertiesGroup);
