import React, { Component, PropTypes } from 'react';
import Settings from './Settings';
import CircleIcon from 'react-icons/lib/fa/circle';
import GearIcon from 'react-icons/lib/fa/cog';
import HelpIcon from 'react-icons/lib/fa/lightbulb-o';
import '../styles/header.css';

export default class Toolbar extends Component {
  render() {
    const { openModal, closeModal, saveSettings, socketOptions } = this.props;
    return (
      <div className='header-container'>
        <div className='header-title'>
          <CircleIcon className='header-circle-icon'/>Log
        </div>
        <div className='header-right'>
          <div
            className='header-button'
            onClick={() => { window.open('https://github.com/wix/react-native-log'); }}
          ><HelpIcon className='header-icon'/>How to use</div>
          <div
            className='header-button'
            onClick={() => openModal(
              <Settings closeModal={closeModal}
                saveSettings={saveSettings} socketOptions={socketOptions}
              />
            )}
          ><GearIcon className='header-icon'/>Settings</div>
        </div>
      </div>
    );
  }
}
