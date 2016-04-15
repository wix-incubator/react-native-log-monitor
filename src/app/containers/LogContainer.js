import React, { Component, PropTypes, createElement } from 'react';
import { connect } from 'react-redux';
import { AutoSizer, VirtualScroll } from 'react-virtualized';
import 'react-virtualized/styles.css';
import styles from '../styles';
import * as logActions from '../store/log/actions';
import SplitPane from 'react-split-pane';
import ObjectInspector from '../components/react-object-inspector/ObjectInspector';
import ObjectPreview from '../components/react-object-inspector/ObjectPreview';
import '../styles/split-pane.css';
import '../styles/log.css';

class LogContainer extends Component {
  render() {
    return (
      <SplitPane split="vertical" defaultSize={440} primary="second">
        <AutoSizer>
          {({ height, width }) => (
            <VirtualScroll
              style={{outline: 'none'}}
              width={width}
              height={height}
              rowsCount={this.props.log.rows.length}
              rowHeight={24}
              overscanRowsCount={10}
              rowRenderer={this.renderRow.bind(this)}
            />
          )}
        </AutoSizer>
        <div key='log-right-pane' style={{padding: 7}}>
          {this.renderRightPane()}
        </div>
      </SplitPane>
    );
  }
  renderRow(index) {
    const row = this.props.log.rows[index];
    return (
      <div className={this.getRowClass(row, index)} onClick={() => this.onRowClick(index)}>
        {this.renderRowBody(row)}
      </div>
    );
  }
  renderRowBody(row) {
    if (row.object && !row.text) return (
      <ObjectPreview object={row.object.asMutable({deep: true})} />
    );
    return (
      row.text
    );
  }
  renderRightPane() {
    const selectedRow = this.props.log.rows[this.props.log.selectedRowIndex];
    if (!selectedRow) return false;
    const object = selectedRow.object;
    if (!object) return false;
    return (
      <ObjectInspector data={object.asMutable()} initialExpandedPaths={['root', 'root.*']} />
    )
  }
  getRowClass(row, index) {
    const type = row.type;
    let res = 'log-log';
    switch (type) {
      case 'LOG_ERROR': res = 'log-error'; break;
    }
    if (this.props.log.selectedRowIndex === index) {
      res += ' selected';
    }
    return res;
  }
  onRowClick(index) {
    this.props.dispatch(logActions.selectRow(index));
  }
}

// which props do we want to inject, given the global state?
function mapStateToProps(state) {
  return {
    log: state.log
  };
}

export default connect(mapStateToProps)(LogContainer);
