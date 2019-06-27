import { put, takeLatest, all } from 'redux-saga/effects';
import api from '../config/api';
import { onSignIn } from '../config/auth';

import { Types as authTypes } from './ducks/auth';
import { Types as activeBookTypes } from './ducks/activeBook';
import * as NavigationService from '../config/navigationServices';

function* asyncChangeBook(action) {
  yield put({
    type: activeBookTypes.CHANGE_SUCCESS,
    payload: {
      book: action.payload.book,
    },
  });
}

function* asyncLogin(action) {
  try {
    const { data: { access_token: userToken } } = yield api.post('/login/',
      action.payload);

    const { data: user } = yield api.get('/me/', {
      params: {
        access_token: userToken,
      },
    });


    yield put({
      type: authTypes.LOGIN_SUCCESS,
      payload: {
        user,
        userToken,
      },
    });

    yield onSignIn(userToken);

    NavigationService.navigate('Main');
  } catch (err) {
    yield put({
      type: authTypes.LOGIN_FAIL,
      payload: {
        error: JSON.stringify(err),
      },
    });
  }
}

export default function* root() {
  yield all(
    [
      takeLatest(activeBookTypes.CHANGE, asyncChangeBook),
      takeLatest(authTypes.LOGIN, asyncLogin),
    ],
  );
}
