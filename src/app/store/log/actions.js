import * as types from './actionTypes';

export function addRow(row) {
  return {type: types.ADD_ROW, row: row};
}
