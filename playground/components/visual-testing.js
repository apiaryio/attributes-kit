import React from 'react';
import request from 'superagent';

import RefractPreviewComponent from './refractPreview';
import {AttributesComponent} from '../../src';

class VisualTestingApp extends React.Component {
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
    const rows = this.state.fixtures.map((fixture, index) => {
      return (
        <div key={index}>
          <div className="column">
            <AttributesComponent data={fixture.parsed} />
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

export default VisualTestingApp;
