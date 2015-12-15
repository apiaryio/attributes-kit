import React from 'react';

class DefaultLayout extends React.Component {
  static propTypes = {
    children: React.PropTypes.arrayOf(React.PropTypes.element),
  };

  render() {
    return (
      <div>
        <div className="header">
        <div className="leftSide"><span>Attributes Kit Playground</span></div>
        <div className="rightSide">
          <span>
            <a target="_blank" className="gitHubIco" href="https://github.com/apiaryio/attributes-kit">Attributes Kit Repository</a>
          </span>
          <span>
            <a target="_blank" className="documentationIco" href="https://github.com/apiaryio/mson">Mson Documentation</a>
          </span>
        </div>
        </div>
        <div className="body">
          {this.props.children}
      </div>
    </div>
    );
  }
}

export default DefaultLayout;
