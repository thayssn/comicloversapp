import { takeLatest, all } from 'redux-saga/effects';
import { authSaga, resetPasswordSaga } from './auth';
import registerSaga from './register';
import {
  activeBookSaga,
  activeBookGetRatingSaga,
  activeBookSetRatingSaga,
} from './activeBook';
import booksSaga from './books';
import { collectionsFetchSaga, collectionsCreateSaga } from './collections';
import publicCollectionsFetchSaga from './publicCollections';
import activeCollectionSaga from './activeCollection';
import userSaga from './user';

import { Types as activeBookTypes } from '../ducks/activeBook';
import { Types as booksTypes } from '../ducks/books';
import { Types as collectionsTypes } from '../ducks/collections';
import { Types as activeCollectionTypes } from '../ducks/activeCollection';
import { Types as authTypes } from '../ducks/auth';
import { Types as registerTypes } from '../ducks/register';
import { Types as userTypes } from '../ducks/user';
import { Types as publicCollectionsTypes } from '../ducks/publicCollections';

export default function* root() {
  yield all(
    [
      takeLatest(activeBookTypes.CHANGE, activeBookSaga),
      takeLatest(activeBookTypes.GET_RATING, activeBookGetRatingSaga),
      takeLatest(activeBookTypes.SET_RATING, activeBookSetRatingSaga),
      takeLatest(authTypes.LOGIN, authSaga),
      takeLatest(authTypes.RESET_PASSWORD, resetPasswordSaga),
      takeLatest(booksTypes.FETCH_ALL, booksSaga),
      takeLatest(registerTypes.REGISTER, registerSaga),
      takeLatest(collectionsTypes.FETCH_ALL, collectionsFetchSaga),
      takeLatest(collectionsTypes.CREATE, collectionsCreateSaga),
      takeLatest(activeCollectionTypes.FETCH, activeCollectionSaga),
      takeLatest(userTypes.FETCH, userSaga),
      takeLatest(publicCollectionsTypes.FETCH_ALL, publicCollectionsFetchSaga),
    ],
  );
}
