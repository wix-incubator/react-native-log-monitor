import React, { Component, PropTypes } from 'react';
import styles from '../styles';

export default class Toolbar extends Component {
  render() {
    return (
      <div className='rc-tabs-top' style={{flex: 0}}>
        <div className='rc-tabs-bar'>
          <div className='rc-tabs-nav-container'>
            <div className='rc-tabs-nav'>
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
