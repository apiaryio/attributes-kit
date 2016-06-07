import React from 'react';
import Radium from 'radium';
import merge from 'lodash/merge';

@Radium
class Error extends React.Component {
  static propTypes = {
    errorMessage: React.PropTypes.string,
    style: React.PropTypes.object,
  };

  get style() {
    const style = {
      base: {
        width: '100%',
        height: 'auto',
        color: '#4C5264',
        backgroundColor: '#fff',
        border: '1px solid rgb(213, 222, 237)',
        paddingTop: '10px',
        paddingBottom: '14px',
        paddingLeft: '16px',
        paddingRight: '16px',
        borderRadius: '3px',
        boxShadow: 'rgb(240, 241, 244) 0px 1px 1px 0px',
      },
      title: {
        fontFamily: 'Source Sans Pro',
        fontSize: '18px',
        lineHeight: '150%',
        fontWeight: '600',
        marginBottom: '2px',
        color: '#DD1711',
      },
      text: {
        fontFamily: 'Source Sans Pro',
        fontSize: '16px',
        lineHeight: '125%',
      },
    };

    return merge(style, this.props.style || {});
  }

  render() {
    return (
      <div style={this.style.base}>
        <h3 style={this.style.title}>Uh-oh, an error occurred!</h3>
        <p style={this.style.text}>{this.props.errorMessage}</p>
      </div>
    );
  }
}

export default Error;
