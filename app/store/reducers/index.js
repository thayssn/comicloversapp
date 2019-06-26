import { combineReducers } from 'redux';
import collections from './collections';
import books from './books';
import activeBook from '../ducks/activeBook';
import auth from '../ducks/auth';

export default combineReducers({
  collections,
  books,
  activeBook,
  auth,
});
