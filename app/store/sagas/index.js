import { takeLatest, all } from 'redux-saga/effects';
import authSaga from './auth';
import activeBookSaga from './activeBook';

import { Types as authTypes } from '../ducks/auth';
import { Types as activeBookTypes } from '../ducks/activeBook';

export default function* root() {
  yield all(
    [
      takeLatest(activeBookTypes.CHANGE, activeBookSaga),
      takeLatest(authTypes.LOGIN, authSaga),
    ],
  );
}
