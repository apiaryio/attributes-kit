import React from 'react';

import ObjectHeader from 'ObjectHeader/ObjectHeader';
import Row from 'Row/Row';
import Column from 'Column/Column';
import Ruler from 'Ruler/Ruler';
import SampleObjectProperty from 'SampleObjectProperty/SampleObjectProperty';


class SampleObject extends React.Component {
  static propTypes = {
    showRuler: React.PropTypes.bool,
    element: React.PropTypes.object,
    parentElement: React.PropTypes.object,
    expandableCollapsible: React.PropTypes.bool,
    showObjectHeader: React.PropTypes.bool,
  }

  constructor(props) {
    super(props);

    this.state = {
      isExpanded: true,
    };
  }

  handleExpandCollapse = () => {
    this.setState({
      isExpanded: !this.state.isExpanded,
    });
  }

  renderStyles() {
    const styles = {
      column: {
        paddingLeft: '8px',
      },
      ruler: {
        root: {
          marginLeft: '6px',
        },
      },
    };

    return styles;
  }

  renderSampleObjectHeader() {
    if (this.props.showObjectHeader === false) {
      return false;
    }

    return (
      <Row>
        <ObjectHeader
          onToggleClick={this.handleExpandCollapse}
          onSampleToggleClick={this.handleExpandCollapse}
          onTypeClick={this.handleExpandCollapse}
          isExpanded={this.state.isExpanded}
          expandableCollapsible={this.props.expandableCollapsible}
          parentElement={this.props.parentElement}
        />
      </Row>
    );
  }


  renderSampleObjectProperties() {
    return (this.props.element.content).map((element, index) => {
      return (
        <SampleObjectProperty
          element={element}
          parentElement={this.props.element}
          key={index}
          index={index}
        />
      );
    });
  }

  renderSampleObject(styles) {
    if (!this.state.isExpanded) {
      return false;
    }

    if (this.props.showRuler) {
      return (
        <Ruler style={styles.ruler}>
          {this.renderSampleObjectProperties()}
        </Ruler>
      );
    }

    return (
      <Column style={styles.column}>
        {this.renderSampleObjectProperties()}
      </Column>
    );
  }

  render() {
    const styles = this.renderStyles();

    return (
      <Row style={styles.root}>
        <Column>
          {this.renderSampleObjectHeader()}

          <Row>
            {this.renderSampleObject(styles)}
          </Row>
        </Column>
      </Row>
    );
  }
}

export default SampleObject;
