import * as types from './actionTypes';

export function addRow(row) {
  return {type: types.ADD_ROW, row: row};
}

export function selectRow(index) {
  return {type: types.SELECT_ROW, index: index};
}

export function deleteAllRows() {
  return {type: types.DELETE_ROWS};
}
