import parseJSON from '../utils/parseJSON';
import * as logActions from  './log/actions';
import { subscribe } from '../services/messaging';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import * as reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

let instance;

function handleMessage(msg) {
  const payload = parseJSON(msg.payload);
  if (!payload) return null;
  store.dispatch(logActions.addRow({type: msg.type, payload: payload}));
}

export function createReduxStore(socketOptions, onInstancesChanged, newInstance) {
  instance = newInstance;
  subscribe(msg => {
    handleMessage(msg);
  }, socketOptions, onInstancesChanged);
  return store;
}

export function updateStoreInstance(newInstance) {
  instance = newInstance;
  if (newInstance !== 'auto') store.liftedStore.setInstance(instance);
}