import isEmpty from 'lodash/isEmpty';
import merge from 'lodash/merge';
import Radium from 'radium';
import React from 'react';
import PropTypes from 'prop-types';

import {
  findParent,
  findElement,
} from '../../Modules/ElementUtils/ElementUtils';

import { DEFAULT_FONT_FAMILY } from '../../Constants/fonts';

@Radium
class InheritanceTree extends React.Component {
  static propTypes = {
    dataStructures: PropTypes.array,
    dereferencedDataStructures: PropTypes.array,
    element: PropTypes.object,
    style: PropTypes.object,
  };

  static contextTypes = {
    onElementLinkClick: PropTypes.func,
    theme: PropTypes.object,
  };

  static buildInheritanceTree = function ({ element, dereferencedDataStructures }) {
    const tree = [];

    // First, push the name of the current data structure.
    tree.unshift(element.meta.id);

    // Next, push the name of the parent data structure of the current one.
    tree.unshift(element.meta.ref);

    // Lastly, find the grandparent and push it to the tree.
    const parentElement = findParent(element.meta.ref, dereferencedDataStructures);

    if (parentElement && parentElement.meta && parentElement.meta.id) {
      tree.unshift(parentElement.meta.id);
    }

    return tree;
  };

  get style() {
    const {
      BORDER_COLOR,
      INHERITANCE_TREE_NODE_COLOR,
      INHERITANCE_TREE_ROOT_NODE_COLOR,
      INHERITANCE_TREE_CURRENT_NODE_COLOR,
    } = this.context.theme;

    const style = {
      base: {
        width: '100%',
        borderTop: `1px solid ${BORDER_COLOR}`,
        paddingBottom: '16px',
      },
      node: {
        listStyleType: 'none',
        display: 'flex',
        fontFamily: DEFAULT_FONT_FAMILY,
        fontWeight: '600',
        fontSize: '12px',
        color: INHERITANCE_TREE_NODE_COLOR,
        backgroundImage: `url(${require('./node.svg')})`,
        backgroundSize: '20px 19px',
        backgroundRepeat: 'no-repeat',
        paddingLeft: '26px',
        height: '19px',
        backgroundPosition: 'left top',
      },
      rootNode: {
        color: INHERITANCE_TREE_ROOT_NODE_COLOR,
        backgroundImage: `url(${require('./rootNode.svg')})`,
        backgroundSize: '10px 2px',
        backgroundPosition: '6px bottom',
        paddingLeft: '22px',
      },
      currentNode: {
        fontFamily: DEFAULT_FONT_FAMILY,
        fontWeight: 'regular',
        fontSize: '12px',
        color: INHERITANCE_TREE_CURRENT_NODE_COLOR,
      },
      nodeText: {
        cursor: 'pointer',
        paddingTop: '9px',

        ':hover': {
          textDecoration: 'underline',
        },
      },
      rootNodeText: {
        paddingTop: '10px',
      },
    };

    return merge(style, this.props.style || {});
  }

  handleClick = (elementId, event) => {
    const element = findElement(elementId, this.props.dereferencedDataStructures);

    if (this.context.onElementLinkClick) {
      return this.context.onElementLinkClick(
        element.meta.id, element, event
      );
    }

    return null;
  }

  renderNodes(inheritanceTree) {
    return inheritanceTree.map((node, index) => {
      const nodeStyle = [this.style.node];
      const nodeTextStyle = [this.style.nodeText];

      if (index === 0) {
        nodeStyle.push(this.style.rootNode);
        nodeTextStyle.push(this.style.rootNodeText);
      }

      if (index === (inheritanceTree.length - 1)) {
        nodeStyle.push(this.style.currentNode);
      }

      // Indentation.
      nodeStyle.push({
        marginLeft: `${index * 10}px`,
      });

      return (
        <li
          style={nodeStyle}
          key={index}
        >
          <span
            style={nodeTextStyle}
            key={index}
            onClick={this.handleClick.bind(this, node)}
          >
            {node}
          </span>
        </li>
      );
    });
  }

  render() {
    if (!this.props.element) {
      return null;
    }

    if (isEmpty(this.props.element.meta)) {
      return null;
    }

    if (!this.props.element.meta.ref) {
      return null;
    }

    const inheritanceTree = InheritanceTree.buildInheritanceTree({
      element: this.props.element,
      dataStructures: this.props.dataStructures,
      dereferencedDataStructures: this.props.dereferencedDataStructures,
    });

    return (
      <div style={this.style.base}>
        <ul>
          {
            this.renderNodes(inheritanceTree)
          }
        </ul>
      </div>
    );
  }
}

export default InheritanceTree;
