import React, { Component, PropTypes, createElement } from 'react';
import { connect } from 'react-redux';
import { AutoSizer, VirtualScroll } from 'react-virtualized';
import 'react-virtualized/styles.css';
import styles from '../styles';
import * as logActions from '../store/log/actions';
import SplitPane from 'react-split-pane';
import ObjectInspector from '../components/react-object-inspector/ObjectInspector';
import ObjectPreview from '../components/react-object-inspector/ObjectPreview';
import Tabs, { TabPane } from 'rc-tabs';
import Toolbar from '../components/Toolbar';
import ToolbarButton from '../components/ToolbarButton';
import '../styles/split-pane.css';
import '../styles/log.css';
import 'rc-tabs/assets/index.css';
import ClearIcon from 'react-icons/lib/fa/trash';

class LogContainer extends Component {
  render() {
    return (
      <SplitPane split="vertical" defaultSize={440} primary="second">
        <div className='log-vertical-pane' key='log-left-pane'>
          <Toolbar>
            <ToolbarButton icon={ClearIcon} title="Clear" onClick={this.onClearClick.bind(this)}/>
          </Toolbar>
          <AutoSizer key='left-side'>
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
        </div>
        <div className='log-vertical-pane' key='log-right-pane'>
          <Tabs>
            <TabPane tab='Details' key='log-details'>
              <div className='log-vertical-pane-overflow' style={{padding: 10, flex: 1}} key='details-padding'>
                {this.renderDetailsPane()}
              </div>
            </TabPane>
            <TabPane tab='Stack' key='log-stack'>
              <div className='log-vertical-pane-overflow' style={{padding: 10, flex: 1}} key='stack-padding'>
                {this.renderStackPane()}
              </div>
            </TabPane>
          </Tabs>
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
  renderDetailsPane() {
    const selectedRow = this.props.log.rows[this.props.log.selectedRowIndex];
    if (!selectedRow) return false;
    const object = selectedRow.object;
    if (!object) return (
      <pre className='log-text-details'>{selectedRow.text}</pre>
    );
    return (
      <ObjectInspector data={object.asMutable()} initialExpandedPaths={['root', 'root.*']} />
    )
  }
  renderStackPane() {
    const selectedRow = this.props.log.rows[this.props.log.selectedRowIndex];
    if (!selectedRow) return false;
    const stack = selectedRow.stack;
    if (!stack) return (
      <pre className='log-text-details'>none</pre>
    );
    let fileNameSkip = 0;
    for (let i = 0 ; i < stack.length ; i++) {
      fileNameSkip = stack[i].file.indexOf('/node_modules/');
      if (fileNameSkip > -1) break;
    }
    return (
      stack.asMutable({deep: true}).map((frame, index) => {
        const fileName = frame.file.substr(fileNameSkip+1);
        const weight = fileName.startsWith('node_modules/') ? '400' : '800';
        return (
          <div style={{marginBottom: 10}}>
            <pre key={`line-${index}`} className={`log-text-details log-stack-file-${weight}`} style={{fontWeight: weight}}>{fileName}:{frame.lineNumber}</pre>
            {
              frame.methodName !== '<unknown>' ?
                <pre key={`func-${index}`} className='log-text-details' style={{fontStyle: 'italic', fontWeight: weight}}><span className='log-stack-func'>function</span> {frame.methodName}()</pre> :
                <pre key={`func-${index}`} className='log-text-details' style={{fontStyle: 'italic', fontWeight: weight}}>global scope</pre>
            }
          </div>
        )}
      )
    );
  }
  getRowClass(row, index) {
    const type = row.type;
    let res = 'log-log';
    switch (type) {
      case 'LOG_ERROR': res = 'log-error'; break;
      case 'LOG_WARN': res = 'log-warn'; break;
    }
    if (this.props.log.selectedRowIndex === index) {
      res += ' selected';
    }
    return res;
  }
  onRowClick(index) {
    this.props.dispatch(logActions.selectRow(index));
  }
  onClearClick() {
    this.props.dispatch(logActions.deleteAllRows());
  }
}

// which props do we want to inject, given the global state?
function mapStateToProps(state) {
  return {
    log: state.log
  };
}

export default connect(mapStateToProps)(LogContainer);
