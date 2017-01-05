/* eslint-disable no-console */

import React from 'react';
import Radium from 'radium';
import request from 'superagent';

import { DEFAULT_FONT_FAMILY, MONO_FONT_FAMILY } from '../../src/Constants/fonts';

import AttributesKit from '../../src';

@Radium
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

  get style() {
    const style = {
      example: {
        border: '1px solid #333',
        paddingBottom: '20px',
        margin: '20px',
        fontFamily: DEFAULT_FONT_FAMILY,
      },
      row: {
        display: 'flex',
        width: '100%',
      },
      title: {
        borderBottom: '1px solid #333',
        marginBottom: '40px',
        backgroundColor: '#333',
        color: '#fff',
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingTop: '10px',
        paddingBottom: '10px',
      },
      titleText: {
        fontFamily: MONO_FONT_FAMILY,
        fontSize: '16px',
      },
      column: {
        width: '50%',
        maxWidth: '50%',
        minWidth: '50%',
        height: 'auto',
      },
      msonColumn: {
        paddingLeft: '20px',
        paddingRight: '40px',
      },
      previewColumn: {
        borderLeft: '1px solid #333',
        paddingLeft: '40px',
        paddingRight: '20px',
      },
      pre: {
        width: '100%',
        maxWidth: '100%',
        minWidth: '100%',
        overflow: 'scroll',
        fontFamily: MONO_FONT_FAMILY,
        fontWeight: '400',
      },
    };

    return style;
  }

  render() {
    const rows = this.state.fixtures.map((fixture) =>
      <div style={this.style.example} key={fixture.fileName}>
        <div style={[this.style.row, this.style.title]}>
          <h3 style={this.style.titleText}>{fixture.fileName}</h3>
        </div>

        <div style={this.style.row}>
          <div style={[this.style.column, this.style.msonColumn]}>
            <pre style={this.style.pre}>
              {fixture.fileContent}
            </pre>
          </div>

          <div style={[this.style.column, this.style.previewColumn]}>
            <AttributesKit.Attributes
              element={fixture.dataStructure}
              dataStructures={fixture.dataStructures}
              collapseByDefault={false}
              maxInheritanceDepth={undefined}
              includedProperties="show"
              inheritedProperties="show"
            />
          </div>
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
