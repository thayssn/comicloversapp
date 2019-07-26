import { combineReducers } from 'redux';
import collections from '../ducks/collections';
import activeCollection from '../ducks/activeCollection';
import books from '../ducks/books';
import activeBook from '../ducks/activeBook';
import auth from '../ducks/auth';
import register from '../ducks/register';

export default combineReducers({
  collections,
  activeCollection,
  books,
  activeBook,
  auth,
  register,
});
