import { combineReducers } from 'redux';
import collections from './collections';
import books from './books';

export default combineReducers({
  collections,
  books
})
