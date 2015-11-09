import React from 'react';

import ObjectProperties from 'ObjectProperties/ObjectProperties';
import ObjectHeader from 'ObjectHeader/ObjectHeader';
import ObjectSamples from 'ObjectSamples/ObjectSamples';
import ObjectDefaults from 'ObjectDefaults/ObjectDefaults';
import Ruler from 'Ruler/Ruler';
import Toggle from 'Toggle/Toggle';
import Row from 'Row/Row';
import Column from 'Column/Column';

import {
  isStructured
} from 'elements/expandableCollapsibleElement'

import {
  getType
} from 'elements/element'


class ObjectComponent extends React.Component {
  static propTypes = {
    data: React.PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.props.data.content = this.props.data.content || [];

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
    let styles = {
      root: {
      },
      ruler: {
        root: {
          paddingBottom: '0px',
        }
      },
      objectPropertiesRow: {}
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
          <ObjectProperties element={this.props.data} />
        </Ruler>
      );
    }

    return (
      <ObjectProperties element={this.props.data} />
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
              element={this.props.data}
              parentElement={this.props.parentElement}
              expandableCollapsible={this.props.expandableCollapsible}
            />
          </Row>

          <Row style={styles.objectPropertiesRow}>
            {this.renderObjectProperties(styles)}
          </Row>

          <Row>
            <ObjectSamples element={this.props.data} />
            <ObjectDefaults element={this.props.data} />
          </Row>
        </Column>
      </Row>
    );
  }
}

export default ObjectComponent;
