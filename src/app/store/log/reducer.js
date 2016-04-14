import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  rows: []
});

export default function log(state = initialState, action = {}) {
  switch (action.type) {
    case types.ADD_ROW:
      return state.merge({
        rows: state.rows.concat([action.row])
      });
    default:
      return state;
  }
}
