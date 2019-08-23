import { put } from 'redux-saga/effects';
import api from '../../services/api';
import { Types } from '../ducks/user';
import { getUserToken } from '../../services/auth';

function* userSaga() {
  try {
    const userToken = yield getUserToken();
    const { data: user } = yield api.get('/me/', {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    yield put({
      type: Types.FETCH_SUCCESS,
      payload: {
        user,
      },
    });
  } catch (err) {
    yield put({
      type: Types.FETCH_FAIL,
      payload: {
        error: JSON.stringify(err),
      },
    });
  }
}

export default userSaga;
