import { put } from 'redux-saga/effects';
import * as NavigationService from '../../services/navigation';
import api from '../../services/api';
import { onSignIn } from '../../services/auth';
import { Types } from '../ducks/register';
import { Types as AuthTypes } from '../ducks/auth';

function* registerSaga(action) {
  try {
    yield api.post('/users/', action.payload);

    const { data: { user, token: userToken } } = yield api.post('/auth/',
      action.payload);

    yield onSignIn(userToken);

    yield put({
      type: Types.REGISTER_SUCCESS,
      payload: {
        success: true,
      },
    });

    yield put({
      type: AuthTypes.LOGIN_SUCCESS,
      payload: {
        user,
        userToken,
      },
    });

    NavigationService.navigate('Main');
  } catch (err) {
    yield put({
      type: Types.REGISTER_FAIL,
      payload: {
        error: JSON.stringify(err),
      },
    });
  }
}

export default registerSaga;
