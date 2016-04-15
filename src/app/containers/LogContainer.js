import React, { Component, PropTypes, createElement } from 'react';
import { connect } from 'react-redux';
import { AutoSizer, VirtualScroll } from 'react-virtualized';
import 'react-virtualized/styles.css';
import styles from '../styles';

function getRowClass(type) {
  switch (type) {
    case 'LOG_LOG': return 'log-log';
    case 'LOG_ERROR': return 'log-error';
  }
  console.log(type);
}

class LogContainer extends Component {
  render() {
    return (
      <AutoSizer>
        {({ height, width }) => (
          <VirtualScroll
          width={width}
          height={height}
          rowsCount={this.props.rows.length}
          rowHeight={24}
          rowRenderer={
            index => <div className={getRowClass(this.props.rows[index].type)}>{JSON.stringify(this.props.rows[index].payload)}</div>
            }
          />
        )}
      </AutoSizer>
    );
  }
}

// which props do we want to inject, given the global state?
function mapStateToProps(state) {
  return {
    rows: state.log.rows
  };
}

export default connect(mapStateToProps)(LogContainer);
