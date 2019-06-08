import { combineReducers } from 'redux';
import text from './text';
import collections from './collections';
import books from './books';

export default combineReducers({
  text,
  collections,
  books
})