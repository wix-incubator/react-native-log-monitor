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
  if (payload.args) {
    for (let argIndex = 0 ; argIndex < Object.keys(payload.args).length ; argIndex++) {
      const argPayload = payload.args[argIndex];
      let text = '';
      let object = undefined;
      if (typeof argPayload === 'object') {
        object = argPayload;
      } else {
        text = argPayload.toString();
      }
      if (msg.type === 'LOG_ERROR' && text.startsWith('Warning: ')) {
        msg.type = 'LOG_WARN';
        text = text.substr('Warning: '.length);
      }
      store.dispatch(logActions.addRow({
        type: msg.type,
        text: text,
        object: object,
        timestamp: payload.ts,
        line: payload.line,
        stack: payload.stack
      }));
    }
  }
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
