import React from 'react';

import ObjectProperties from '../ObjectProperties/ObjectProperties';
import ObjectHeader from '../ObjectHeader/ObjectHeader';
import ObjectSamples from '../ObjectSamples/ObjectSamples';
import ObjectDefaults from '../ObjectDefaults/ObjectDefaults';
import Ruler from '../Ruler/Ruler';
import Row from '../Row/Row';
import Column from '../Column/Column';


class ObjectComponent extends React.Component {
  static propTypes = {
    element: React.PropTypes.object,
    expandableCollapsible: React.PropTypes.bool,
    parentElement: React.PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.props.element.content = this.props.element.content || [];

    this.state = {
      isExpanded: true,
    };
  }

  handleExpandCollapse = () => {
    this.setState({
      isExpanded: !this.state.isExpanded,
    });
  };

  renderStyles() {
    const styles = {
      ruler: {
        root: {
          paddingBottom: '0px',
        },
      },
      objectPropertiesRow: {
      },
    };

    if (this.props.expandableCollapsible) {
      styles.objectPropertiesRow.paddingLeft = '6px';
    }

    return styles;
  }

  renderObjectProperties(styles) {
    if (!this.state.isExpanded) {
      return false;
    }

    if (this.props.expandableCollapsible) {
      return (
        <Ruler style={styles.ruler}>
          <ObjectProperties element={this.props.element} />
        </Ruler>
      );
    }

    return (
      <ObjectProperties element={this.props.element} />
    );
  }

  render() {
    const styles = this.renderStyles();

    return (
      <Row>
        <Column>
          <Row>
            <ObjectHeader
              onToggleClick={this.handleExpandCollapse}
              onSampleToggleClick={this.handleExpandCollapse}
              onTypeClick={this.handleExpandCollapse}
              isExpanded={this.state.isExpanded}
              element={this.props.element}
              parentElement={this.props.parentElement}
              expandableCollapsible={this.props.expandableCollapsible}
            />
          </Row>

          <Row style={styles.objectPropertiesRow}>
            {this.renderObjectProperties(styles)}
          </Row>

          <Row>
            <ObjectSamples element={this.props.element} />
            <ObjectDefaults element={this.props.element} />
          </Row>
        </Column>
      </Row>
    );
  }
}

export default ObjectComponent;
