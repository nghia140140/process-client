import * as types from "./types";
import produce from "immer";

const initialState = {};

const reducer = produce((draft, { type, payload }) => {
  if (type === types.ADD_FARMSEASION) return draft;
  return draft;
}, initialState);

export default reducer;
