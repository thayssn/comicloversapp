import { put } from 'redux-saga/effects';
import * as NavigationService from '../../services/navigation';
import api from '../../services/api';
import { onSignIn } from '../../services/auth';
import { Types } from '../ducks/auth';

function* authSaga(action) {
  try {
    const { data: { token: userToken } } = yield api.post('/auth/',
      action.payload);

    const { data: user } = yield api.get('/me/', {
      headers: {
        Authorization: `Bearer ${userToken}`,
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
