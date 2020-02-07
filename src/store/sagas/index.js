import { takeLatest, all } from 'redux-saga/effects';
import { authSaga, authWithFBSaga, resetPasswordSaga } from './auth';
import registerSaga from './register';
import {
  activeBookSaga,
  activeBookGetReviewSaga,
  activeBookSetReviewSaga,
  activeBookAddToCollectionSaga,
  activeBookRemoveFromCollectionSaga,
} from './activeBook';
import booksSaga from './books';
import {
  collectionsFetchSaga,
  collectionsCreateSaga,
  collectionsEditSaga,
  collectionsDeleteSaga,
} from './collections';
import publicCollectionsFetchSaga from './publicCollections';
import activeCollectionSaga from './activeCollection';
import userSaga from './user';
import favoritesFetchSaga from './favorites';
import wantedFetchSaga from './wanted';

import { Types as activeBookTypes } from '../ducks/activeBook';
import { Types as booksTypes } from '../ducks/books';
import { Types as collectionsTypes } from '../ducks/collections';
import { Types as activeCollectionTypes } from '../ducks/activeCollection';
import { Types as authTypes } from '../ducks/auth';
import { Types as registerTypes } from '../ducks/register';
import { Types as userTypes } from '../ducks/user';
import { Types as publicCollectionsTypes } from '../ducks/publicCollections';
import { Types as favoritesTypes } from '../ducks/favorites';
import { Types as wantedTypes } from '../ducks/wanted';

export default function* root() {
  yield all(
    [
      takeLatest(activeBookTypes.CHANGE, activeBookSaga),
      takeLatest(activeBookTypes.GET_REVIEW, activeBookGetReviewSaga),
      takeLatest(activeBookTypes.SET_REVIEW, activeBookSetReviewSaga),
      takeLatest(activeBookTypes.ADD_TO_COLLECTION, activeBookAddToCollectionSaga),
      takeLatest(activeBookTypes.REMOVE_FROM_COLLECTION, activeBookRemoveFromCollectionSaga),
      takeLatest(authTypes.LOGIN, authSaga),
      takeLatest(authTypes.LOGIN_FB, authWithFBSaga),
      takeLatest(authTypes.RESET_PASSWORD, resetPasswordSaga),
      takeLatest(booksTypes.FETCH_ALL, booksSaga),
      takeLatest(registerTypes.REGISTER, registerSaga),
      takeLatest(collectionsTypes.FETCH_ALL, collectionsFetchSaga),
      takeLatest(collectionsTypes.CREATE, collectionsCreateSaga),
      takeLatest(collectionsTypes.EDIT, collectionsEditSaga),
      takeLatest(collectionsTypes.DELETE, collectionsDeleteSaga),
      takeLatest(activeCollectionTypes.FETCH, activeCollectionSaga),
      takeLatest(userTypes.FETCH, userSaga),
      takeLatest(publicCollectionsTypes.FETCH_ALL, publicCollectionsFetchSaga),
      takeLatest(favoritesTypes.FETCH_ALL, favoritesFetchSaga),
      takeLatest(wantedTypes.FETCH_ALL, wantedFetchSaga),
    ],
  );
}
