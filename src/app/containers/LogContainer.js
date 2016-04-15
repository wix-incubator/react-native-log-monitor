import React, { Component, PropTypes, createElement } from 'react';
import { connect } from 'react-redux';
import { AutoSizer, VirtualScroll } from 'react-virtualized';
import 'react-virtualized/styles.css';
import styles from '../styles';
import * as logActions from '../store/log/actions';
import '../styles/log.css';

class LogContainer extends Component {
  render() {
    return (
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
    );
  }
  renderRow(index) {
    return (
      <div className={this.getRowClass(index)} onClick={() => this.onRowClick(index)}>
        {JSON.stringify(this.props.log.rows[index].payload)}
      </div>
    );
  }
  getRowClass(index) {
    const type = this.props.log.rows[index].type;
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
