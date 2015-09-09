import React from 'react';
import JSONFormatter from 'json-formatter-js/src/index';

import 'json-formatter-js/dist/style.css'

class JsonFormatterComponent extends React.Component {
  constructor(props) {
    super(props);

  }

  attachJsonFormatter() {
    if (this.nodeComponent !== undefined) {
      const formatter = new JSONFormatter(this.props.data, 3, { hoverPreviewEnabled: true });
      if (this.nodeComponent.hasChildNodes()) {
        this.nodeComponent.removeChild(this.nodeComponent.firstChild);
      }

      this.nodeComponent.appendChild(formatter.render());
    }
  }

  componentDidMount() {
    this.nodeComponent = React.findDOMNode(this.refs.jsonFormatterContainer);
    this.attachJsonFormatter();
  }

  render() {
      this.attachJsonFormatter();
      return (
        <div ref="jsonFormatterContainer">
        </div>
      );
  }
}

export default JsonFormatterComponent;
