import React from 'react';
import JSONFormatter from 'json-formatter-js/src/index';

import 'json-formatter-js/dist/style.css'

class JsonFormatterComponent extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    const formatter = new JSONFormatter(this.props.data, 3, {hoverPreviewEnabled: true});
    const nodeComponent = React.findDOMNode(this.refs.jsonFormatterContainer);
    nodeComponent.appendChild(formatter.render());
  }

  render() {
      return (
        <div ref="jsonFormatterContainer">
        </div>
      );
  }
}

export default JsonFormatterComponent;
