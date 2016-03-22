/* eslint-disable no-console */

import React from 'react';
import request from 'superagent';

import JsonFormatter from './JsonFormatter';
import AttributesKit from '../../src';


class Examples extends React.Component {
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

        return this.setState({ fixtures: res.body });
      });
  }

  render() {
    const rows = this.state.fixtures.map((fixture) =>
      <div className="visualTestingContainer" key={fixture.name}>
        <div className="column">
          <pre>
            {fixture.mson}
          </pre>
        </div>
        <div className="column">
          <JsonFormatter element={fixture.parsed[0]} />
        </div>
        <div className="column">
          <AttributesKit.Attributes
            element={fixture.parsed[0]}
            collapseByDefault={false}
            maxInheritanceDepth={undefined}
            inheritanceTree={false}
            includedProperties="show"
            inheritedProperties="show"
          />
        </div>
      </div>
    );

    return (
      <div className="playgrund-app">
        {rows}
      </div>
    );
  }
}

export default Examples;
