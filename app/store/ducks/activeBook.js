import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
  changeBook: ['book'],
});

const INITIAL_STATE = {};

const change = (state, action) => action.book;

export default createReducer(INITIAL_STATE, {
  [Types.CHANGE_BOOK]: change,
});
