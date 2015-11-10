import React from 'react';
import ReactDom from 'react-dom';
import JSONFormatter from 'json-formatter-js/src/index';

import 'json-formatter-js/dist/style.css';

class JsonFormatter extends React.Component {
  static propTypes = {
    element: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.nodeComponent = ReactDom.findDOMNode(this.refs.jsonFormatterContainer);
    this.attachJsonFormatter();
  }

  attachJsonFormatter() {
    if (this.nodeComponent !== undefined) {
      const formatter = new JSONFormatter(this.props.element, 3, { hoverPreviewEnabled: false });
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
