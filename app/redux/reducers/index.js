import { combineReducers } from 'redux';
import collections from './collections';
import books from './books';
import activeBook from './activeBook';

export default combineReducers({
  collections,
  books,
  activeBook,
});
