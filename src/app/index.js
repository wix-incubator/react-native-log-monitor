import React, { Component, PropTypes } from 'react';
import Modal from 'react-modal';
import { saveToStorage, getSettings, getSelectMonitor, saveSelectMonitor } from './utils/localStorage';
import styles from './styles';
import LogContainer from './containers/LogContainer';
import { createReduxStore, updateStoreInstance } from './store/createStore';
import Header from './components/Header';
import ButtonBar from './components/ButtonBar';
import Instances from './components/Instances';

export default class App extends Component {
  static propTypes = {
    selectMonitor: PropTypes.string,
    socketOptions: PropTypes.shape({
      hostname: PropTypes.string,
      port: PropTypes.number,
      autoReconnect: PropTypes.bool
    }),
    noButtonBar: PropTypes.bool
  };
  constructor(props) {
    super(props);
    this.state = {
      monitor: getSelectMonitor() || props.selectMonitor || 'default',
      modalIsOpen: false,
      instances: {},
      instance: 'auto'
    };
    this.socketOptions = getSettings() || props.socketOptions;
    this.store = this.createStore();
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.saveSettings = this.saveSettings.bind(this);
  }
  handleInstancesChanged = (instance, name, toRemove) => {
    const instances = this.state.instances;
    if (toRemove) {
      delete instances[instance];
      if (this.state.instance === instance) {
        updateStoreInstance('auto');
        this.setState({ instance: 'auto', instances });
        return;
      }
    }
    else instances[instance] = name || instance;
    this.setState({ instances });
  };
  handleSelectInstance = e => {
    const instance = e.target.value;
    updateStoreInstance(instance);
    this.setState({ instance });
  };
  createStore() {
    return createReduxStore(
      this.socketOptions,
      this.handleInstancesChanged,
      this.state.instance
    );
  }
  saveSettings(isLocal, options) {
    this.socketOptions = saveToStorage(
      !isLocal, ['hostname', 'port'], options
    ) || undefined;
    this.store = this.createStore();
    this.closeModal();
  }
  openModal(content) {
    this.modalContent = content;
    this.setState({ modal: this.modal, modalIsOpen: true });
  }
  closeModal() {
    this.modalContent = null;
    this.setState({ modalIsOpen: false });
  }
  render() {
    const key = (this.socketOptions ? this.socketOptions.hostname : '') + this.state.instance;
    return (
      <div style={styles.container}>
        <Header
          openModal={this.openModal} closeModal={this.closeModal}
          saveSettings={this.saveSettings}
          socketOptions={this.socketOptions}
        >
          <Instances instances={this.state.instances} onSelect={this.handleSelectInstance}/>
        </Header>
        <LogContainer store={this.store} key={'log-container' + key} />
        <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal}
          style={styles.modal}
        >{this.modalContent}</Modal>
      </div>
    );
  }
}
