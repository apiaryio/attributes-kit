import React from 'react';
import ReactDom from 'react-dom';
import JSONFormatter from 'json-formatter-js/src/index';

import 'json-formatter-js/dist/style.css';

class JsonFormatter extends React.Component {

  static propTypes = {
    data: React.PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      jsonFormatted: true,
    };
  }

  componentDidMount() {
    this.attachJsonFormatter();
  }

  attachJsonFormatter() {
    if (this.refs.jsonFormatterContainer !== undefined) {
      const formatter = new JSONFormatter(this.props.data, 3, { hoverPreviewEnabled: false });
      if (this.refs.jsonFormatterContainer.hasChildNodes()) {
        this.refs.jsonFormatterContainer.removeChild(this.refs.jsonFormatterContainer.firstChild);
      }

      this.refs.jsonFormatterContainer.appendChild(formatter.render());
    }
  }

  switchJsonView = () => {
    this.setState((state) => {
      return { jsonFormatted: !state.jsonFormatted };
    });
  }

  render() {
    this.attachJsonFormatter();

    const jsonFormatterStyle = {
      display: this.state.jsonFormatted === true ? 'inherit' : 'none',
    };

    const preFormatterStyle = {
      display: this.state.jsonFormatted === true ? 'none' : 'inherit',
    };

    return (
      <div>
        <button onClick={this.switchJsonView}>Switch view</button>
        <div style={jsonFormatterStyle} ref="jsonFormatterContainer" />
        <pre style={preFormatterStyle}>{JSON.stringify(this.props.data, null, 2)}</pre>
      </div>
    );
  }
}

export default JsonFormatter;
