import React, { Component, PropTypes } from 'react';
import styles from '../styles';

export default class ToolbarButton extends Component {
  render() {
    const Icon = this.props.icon;
    return (
      <div className='rc-tabs-tab'>
        <div className='rc-tabs-tab-inner' onClick={this.props.onClick}>
          {Icon ? <Icon style={{marginBottom: 2, marginRight: 2}} /> : false}
          {this.props.title}
        </div>
      </div>
    );
  }
}
