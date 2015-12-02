import React from 'react';

const styles = {
  root: {
    display: 'block',
    float: 'left',
    width: '100%',
    height: 'auto',
    backgroundColor: 'rgba(255, 204, 153, 0.3)',
    border: '1px solid #FFCC99',
    fontFamily: 'Source Sans Pro',
    fontSize: '12pt',
    color: '#777777',
    paddingLeft: '10px',
    paddingRight: '10px',
    paddingTop: '6px',
    paddingBottom: '6px',
    fontWeight: 'regular',
    borderRadius: '4px',
  },
};

class Error extends React.Component {

  getErrorMessage() {
    if (process.env.NODE_ENV === 'production') {
      return 'I am sorry, I was not able to render this thing.';
    }

    return `${this.props.error} ${this.props.filename}`;
  }

  render() {
    return (
      <div style={styles.root}>
        <p>{this.getErrorMessage()}</p>
      </div>
    );
  }
}

export default Error;
