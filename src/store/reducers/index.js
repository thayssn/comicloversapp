import { combineReducers } from 'redux';
import collections from '../ducks/collections';
import publicCollections from '../ducks/publicCollections';
import activeCollection from '../ducks/activeCollection';
import books from '../ducks/books';
import activeBook from '../ducks/activeBook';
import auth from '../ducks/auth';
import register from '../ducks/register';
import user from '../ducks/user';
import favorites from '../ducks/favorites';
import wanted from '../ducks/wanted';
import loading from '../ducks/loading';

export default combineReducers({
  publicCollections,
  collections,
  activeCollection,
  books,
  activeBook,
  auth,
  register,
  user,
  favorites,
  wanted,
  loading,
});
