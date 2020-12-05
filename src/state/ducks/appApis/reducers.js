import * as types from './types';
import produce from 'immer';

const initialState = {}

const reducer = produce((draft, { type, payload }) => {
  return draft
}, initialState);

export default reducer;
