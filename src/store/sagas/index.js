import { takeLatest, all } from 'redux-saga/effects';
import authSaga from './auth';
import registerSaga from './register';
import activeBookSaga from './activeBook';
import booksSaga from './books';

import { Types as booksTypes } from '../ducks/books';
import { Types as authTypes } from '../ducks/auth';
import { Types as activeBookTypes } from '../ducks/activeBook';
import { Types as registerTypes } from '../ducks/register';

export default function* root() {
  yield all(
    [
      takeLatest(activeBookTypes.CHANGE, activeBookSaga),
      takeLatest(authTypes.LOGIN, authSaga),
      takeLatest(booksTypes.FETCH_ALL, booksSaga),
      takeLatest(registerTypes.REGISTER, registerSaga),
    ],
  );
}
