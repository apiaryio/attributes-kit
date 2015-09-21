import React from 'react';
import request from 'superagent';

import JsonFormatter from './JsonFormatter';
import {Attributes} from '../../src';


class VisualTesting extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fixtures: [],
    };
  }

  componentDidMount() {
    request
      .get('/fixtures')
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          return console.error(res.text);
        }

        this.setState({fixtures: res.body});
      });
  }

  render() {
    const rows = this.state.fixtures.map((fixture) => {
      return (
        <div className="visualTestingContainer" key={fixture.name}>
          <div className="column">
            <pre>
              {fixture.mson}
            </pre>
          </div>
          <div className="column">
            <JsonFormatter data={fixture.parsed} />
          </div>
          <div className="column">
            <Attributes data={fixture.parsed} />
          </div>
        </div>
      );
    });

    return (
      <div className="playgrund-app">
        {rows}
      </div>
    );
  }
}

export default VisualTesting;
