import eidolon from 'eidolon';
import React from 'react';
import ReactDom from 'react-dom';
import JSONFormatter from 'json-formatter-js/src/index';

import 'json-formatter-js/dist/style.css';

class JsonFormatter extends React.Component {
  static propTypes = {
    element: React.PropTypes.object,
    dataStructures: React.PropTypes.array,
  };

  componentDidMount() {
    this.nodeComponent = ReactDom.findDOMNode(this.refs.jsonFormatterContainer);
    this.attachJsonFormatter();
  }

  attachJsonFormatter() {
    if (this.nodeComponent !== undefined) {
      let element = this.props.element;

      if (element && this.props.dataStructures) {
        // Convert the list into a map of id -> structure.
        const structures = {};
        for (const item of this.props.dataStructures) {
          structures[item.meta.id] = item;
        }

        // Dereference the element. This overwrites the original
        // value with the normalized result. Reference information
        // is still available in the `meta.ref` properties.
        element = JSON.parse(JSON.stringify(element));
        element = eidolon.dereference(element, structures);
      }

      const formatter = new JSONFormatter(element, 3, { hoverPreviewEnabled: false });
      if (this.nodeComponent.hasChildNodes()) {
        this.nodeComponent.removeChild(this.nodeComponent.firstChild);
      }

      this.nodeComponent.appendChild(formatter.render());
    }
  }

  render() {
    this.attachJsonFormatter();
    return (
      <div ref="jsonFormatterContainer">
      </div>
    );
  }
}

export default JsonFormatter;
