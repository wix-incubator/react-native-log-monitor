import React, { Component, PropTypes, createElement } from 'react';
import { connect } from 'react-redux';
import { AutoSizer, VirtualScroll } from 'react-virtualized';
import 'react-virtualized/styles.css';

class LogContainer extends Component {
  render() {
    return (
      <AutoSizer>
        {({ height, width }) => (
          <VirtualScroll
          width={width}
          height={height}
          rowsCount={this.props.rows.length}
          rowHeight={20}
          rowRenderer={
            index => <div style={{overflow: 'hidden', height: 20}}>{JSON.stringify(this.props.rows[index])}</div>
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
