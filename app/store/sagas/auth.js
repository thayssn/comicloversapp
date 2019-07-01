import { put } from 'redux-saga/effects';
import * as NavigationService from '../../config/navigationServices';
import api from '../../config/api';
import { onSignIn } from '../../config/auth';
import { Types } from '../ducks/auth';

function* authSaga(action) {
  try {
    const { data: { access_token: userToken } } = yield api.post('/login/',
      action.payload);

    const { data: user } = yield api.get('/me/', {
      params: {
        access_token: userToken,
      },
    });

    yield onSignIn(userToken);

    yield put({
      type: Types.LOGIN_SUCCESS,
      payload: {
        user,
        userToken,
      },
    });

    NavigationService.navigate('Main');
  } catch (err) {
    yield put({
      type: Types.LOGIN_FAIL,
      payload: {
        error: JSON.stringify(err),
      },
    });
  }
}

export default authSaga;
