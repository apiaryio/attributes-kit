import React from 'react';
import radium from 'radium';
import merge from 'lodash/merge';
import pluralize from 'pluralize';

import {
  findElement,
} from '../../Modules/ElementUtils/ElementUtils';

class ObjectPropertiesGroup extends React.Component {
  static propTypes = {
    children: React.PropTypes.any,
    name: React.PropTypes.string,
    style: React.PropTypes.object,
    type: React.PropTypes.string,
  };

  static contextTypes = {
    dereferencedDataStructures: React.PropTypes.array,
    onElementLinkClick: React.PropTypes.func,
    includedProperties: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.string,
    ]),
    inheritedProperties: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.string,
    ]),
  };

  get style() {
    const style = {
      base: {

      },
      header: {
        borderBottom: '1px solid #E8EBEE',
        color: 'rgba(138, 147, 163, 0.75)',
        fontFamily: 'Source Sans Pro',
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
        fontFamily: 'Source Sans Pro',
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
            {propertiesCount} {pluralize('property', propertiesCount)}
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
            {propertiesCount} {pluralize('property', propertiesCount)}
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
